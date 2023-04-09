<template>
    <div class="comp">
        <div class="image" v-if="!imageSrc">
            <img :src="userAvatar" ref="img" id="avatar" />
        </div>
        <div class="image" v-else>
            <img v-show="imageSrc" :src="imageSrc" ref="img" id="avatar" />
        </div>
        <div class="cropper">
            <div class="whatever">
                <v-btn @click="imageInput.click()" v-if="!imageSrc" disabled>Select Image</v-btn>
                <v-btn @click="handleCroppedImage" disabled v-else>Change Image</v-btn>
                <v-btn @click="fileCleared" variant="error" disabled>Clear</v-btn>
                <input type="file" ref="imageInput" accept=".jpg,.png,.jped" @change="fileChanged" :style="{ display: 'none' }">
            </div>
            <div class="selected">
                <span>selected File:</span>
                <span v-if="selectedFile">{{ selectedFile.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect, watch, onMounted, onUnmounted } from 'vue';
import Cropper from 'cropperjs';
import axios from 'axios';
export default {
    name: 'avatarCropper',
    props: ['userAvatar'],
    event: ['imageCropped'],
    setup() {
        const imageInput = ref(null);
        const selectedFile = ref(null);
        const imageSrc = ref(null);
        const img = ref(null);
        const fileReader = new FileReader();
        let cropper = null

        fileReader.onload = (e) => {
            imageSrc.value = e.target.result;
        }
        const fileChanged = (e) => {
            const files = e.target.files;
            if(files.length > 0) {
                selectedFile.value = files[0];
            }
        };

        const handleCroppedImage = () => {
            cropper.getCroppedCanvas({
                width: 512,
                height: 512,
            })
            .toBlob((blog) => {
                const formData = new FormData();
                formData.append("avatar", blog);
                axios.post(`${process.env.VUE_APP_URI}profile/update/avatar`, formData, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {
                    selectedFile.value = null;
                    cropper.destroy();
                    window.location.reload();
                    return response;

                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            }, 'image/jpeg', 1);
        }

        const fileCleared = () => {
            selectedFile.value = null;
        };

        watchEffect(() => {
            if(selectedFile.value) {
                fileReader.readAsDataURL(selectedFile.value);
            } else {
                imageSrc.value = null;
            }
        })

        onMounted(() => {
            cropper = new Cropper(img.value, {
                aspectRatio: 1,
                minCropBoxHeight: 512,
                minCropBoxWidth: 512,
                viewMode: 3,
                dragMode: 'move',
                background: false,
                cropBoxMovable: false,
                cropBoxResizable: false,
            })
        });

        onUnmounted(() => {
            cropper.destroy();
        });

        watch( imageSrc, () => {
            if(imageSrc.value) {
                cropper.replace(imageSrc.value);
            }
        }, {
            flush: 'post'
        });

        return { 
            imageInput,
            selectedFile,
            fileChanged,
            fileCleared,
            imageSrc,
            img,
            handleCroppedImage
        };
        }
    }
</script>

<style scope>
@import 'cropperjs/dist/cropper.min.css';
img {
    max-width: 256px;
}
.cropper-view-box, .cropper-face {
    border-radius: 50%;
}
</style>