<template>
    <!-- 404 page -->
    <div class="container">
        <div class="row">
            <div class="col-md-12 justify-center">
                <h1>404</h1>
                <h2>Page not found</h2>
                <p>
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <p>
                    Please try the following:
                </p>
                <ul>
                    <li>
                        Check the URL for errors
                    </li>
                    <li>
                        <router-link to="/">Go to home page</router-link>
                    </li>
                    <li>
                        <router-link to="/contact">Contact us</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '404Page'
}
</script>