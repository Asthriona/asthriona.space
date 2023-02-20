<!-- 
  Make this page dynamic with projects and everything can be changed at anythime via the gateway.
 -->
<template>
  <div class="home">
    <div class="head-banner">
      <div class="header-content">
        <v-col cols="12" class="avatar d-flex justify-center">
          <v-avatar size="250" class="mt-4">
            <v-img style="opacity: 1;" lazy
              src="https://pbs.twimg.com/profile_images/1523324400245825537/zQiBhAZV_400x400.jpg"></v-img>
          </v-avatar>
        </v-col>
        <span>
          <div class="display-4 text-center font-logo">Asthriona</div>
        </span>
        <span>
          <div class="display-2 text-center randomText">{{ chosenLine }}</div>
        </span>
      </div>
      <div class="subline">
        <v-col cols="12" class="d-flex justify-center"> </v-col>
      </div>
    </div>
    <hr />
    <v-spacer></v-spacer>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6" class="m">
          <div class="base mt-4 text-center display-1">
            Welcome to my shitpost place!
          </div>
          <div class="Infos mt-4 text-center">
            <span>
              <v-icon>mdi-information</v-icon> Information about this space...
              <span>
                <p>
                  This space is random... I will post pretty much anything that
                  goes through my head, nothing really serious (I mean about
                  work). if you are a recruiter or someone who want to work with
                  me, Please visite my
                  <a href="asthriona.com">more serious website</a>. also you
                  should know that both website has been made by myself, from
                  the ground up.<br />

                  else, welcome! :D Let's be weird together! <br>
                </p>
              </span>
            </span>
          </div>
        </v-col>
        <v-col cols="12">
          <h1 class="heading">My Works</h1>
          I've been last seen working on <a :href="gitHub.repo.url" target="_blank" rel="noopener noreferrer">{{
            gitHub.repo.name || "Network Error..." }}</a> <code>{{ gitHub.commits.push_id || "null" }}</code>
        </v-col>
        <v-col v-for="work in works" :key="work.title" xs="12" sm="6" md="6" lg="3" xl="3">
          <!-- Works -->
          <v-card>
            <v-img :src="work.img" lazy></v-img>
            <v-card-title>{{ work.title }}</v-card-title>
            <v-card-text>{{ work.description }}</v-card-text>
            <v-card-actions>
              <v-btn :href="work.url" target="_blank" color="primary" dark :disabled="!work.url">
                <v-icon>mdi-link</v-icon>
                Visit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12">
          <h1>Anime</h1>
          In order of preferance. <br />
          Last activity: <code><span class="lastAnime"></span></code> <br />
          Anilist Profile: <a href="https://anilist.co/user/Asthriona/" target="_blank"
            rel="noopener noreferrer">Asthriona</a>
        </v-col>
        <v-col v-for="anime in animes" :key="anime.title" xs="12" sm="6" md="6" lg="3" xl="3">
          <v-card>
            <v-img :src="anime.img" max-height="450" lazy></v-img>
            <v-card-title>{{ anime.title }}</v-card-title>
            <v-card-text>{{ anime.description }}</v-card-text>
            <v-card-actions>
              <v-btn :href="anime.url" target="_blank" color="primary" dark :disabled="!anime.url">
                <v-icon>mdi-link</v-icon>
                Anilist
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" class="mt-4">
          <h1 class="text-center display-1 mt-4">Asthriona proudly sponsors:</h1>
          <!-- <p class="muted text-center mb-4">sponsoring for 30 000 yen</p> -->
          <v-col cols="12" class="d-flex justify-space-around mb-6 mt-6 sponsor">
            <img src="https://cdn.asthriona.com/static/good-smile-racing.png" height="120px" />
            <img src="https://cdn.asthriona.com/static/personal-sponsor-2022.png" height="120px" />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      works: [
        {
          title: "Asthriona.space",
          description: "Place for random stuff.",
          url: "https://asthriona.space",
          img: "https://cdn.asthriona.com/i/2022/05/asthrionaSpace.png"
        },
        {
          title: "Asthriona.com",
          description: "My more serious Website.",
          url: "https://Asthriona.com",
          img: "https://cdn.asthriona.com/i/2022/05/Asthriona.png"
        },
        {
          title: "Yukiko.app",
          description: "The best discord bot you can find!",
          url: "https://yukiko.app",
          img: "https://cdn.asthriona.com/i/2022/05/Yukiko%20-%20Discord%20Bot.png"
        },
        // {
        //   title: "Rainboom Studio",
        //   description: "Game studio.",
        //   url: "https://rainboomstudio.com/",
        //   img: "https://cdn.asthriona.com/i/2022/05/rainboomStudio.png"
        // },
        {
          title: "CablePorn",
          description: "Automated Twitter Account.",
          url: "https://twitter.com/CablePorn_",
          img: "https://cdn.asthriona.com/i/2022/05/cablePorn.png"
        },

      ],
      animes: [
        {
          title: "Angel Beats!",
          description: "Otonashi wakes up in the afterlife to find out he has no memories of his life before death.",
          url: "https://anilist.co/anime/6547/Angel-Beats/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6547-3jWzWyXg34Et.png"
        },
        {
          title: "Steins;Gate",
          description: "Self-proclaimed mad scientist Okabe Rintarou lives in Akihabara, where he invents \"future gadgets\" with fellow lab members",
          url: "https://anilist.co/anime/9253/SteinsGate/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg"
        },
        {
          title: "To your Eternity",
          description: "In the beginning, an \"orb\" is cast unto Earth. \"It\" can do two things: change into the form of the thing that stimulates \"it\".",
          url: "https://anilist.co/anime/114535/To-Your-Eternity/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx114535-y3NnjexcqKG1.jpg"
        },
        {
          title: "Hitoribocchi",
          description: "Hitori Bocchi suffers from extreme social anxiety, she’s not good at talking to people, takes pretty extreme actions to avoid them.",
          url: "https://anilist.co/anime/101386/Hitoribocchi-no-Marumaruseikatsu/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101386-ZtlTugIEuorU.png"
        },
        {
          title: "五等分の花嫁",
          description: "Uesugi Fuutarou, a high school second-year from a poor family, receives a highly appealing offer to work part-time as a tutor.",
          url: "https://anilist.co/anime/103572/The-Quintessential-Quintuplets/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx103572-2MXV30htoCSh.png"
        },
        {
          title: "Durarara!!",
          description: "In Tokyo's downtown district of Ikebukuro, amidst many strange rumors and warnings of the existence of a headless \"Black Rider\"",
          url: "https://anilist.co/anime/6746/Durarara/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx6746-Q4EmstN2fy0R.png"
        },
        {
          title: "Boogiepop and Others",
          description: "There is an urban legend that children tell one another about a shinigami that can release people from the pain they may be suffering.",
          url: "https://anilist.co/anime/101283/Boogiepop-and-Others/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx101283-YpZqD7wrzWui.jpg"
        },
        {
          title: "Wangan Midnight",
          description: "The story gets its roots from the actual street racing that occurs on Tokyo's Shuto Expressway, one stretch of which is known as the \"Wangan\"",
          url: "https://anilist.co/anime/2608/Wangan-Midnight/",
          img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2608-J8zVMG1LO7CS.jpg"
        },
      ],
      lastAnime: {},
      rdmText: [
        "/*This line is disabled*/",
        "Hello from Speedtest.net!",
        `Welcome to 2020 Season ${new Date().getFullYear() + 1 - 2020}!`,
        `You can now play ${new Date().getFullYear() - 1} as luigi`,
        `Click here to cancel your subscription to ${new Date().getFullYear()}`,
        "Every brilliant day should be lived for those who passed away."
      ],
      chosenLine: "",
      gitHub: {
        repo: {},
        commits: {},
      },
    };
  },
  mounted() {
    // get current year
    this.chosenLine = this.rdmText[Math.floor(Math.random() * this.rdmText.length)];
    axios.post('https://graphql.anilist.co', {
      query: `
      query{
        Page(perPage: 10) {
          activities(userId: 63103, sort: ID_DESC) {
            ... on ListActivity {
              id
              progress
              status
              media {
                id
                type
                episodes
                siteUrl
                title {
                  english
                }
              }
            }
          }
        }
      }`
      ,
      variables: {
        id: 101386
      }
    })
      .then((res) => {
        const anime = res.data.data.Page.activities[0];
        const status = res.data.data.Page.activities[0].status;
        const lastText = `${status.charAt(0).toUpperCase() + status.slice(1)} ${anime.media.title.english} (${anime.progress == null ? anime.media.episodes : anime.progress.split("-")[1].replace(/\s/g, '')}/${anime.media.episodes})`;
        const lastUrl = anime.media.siteUrl;
        // get element with class "lastAnime"
        const lastAnime = document.querySelector(".lastAnime");
        // add a:blank to the element
        const a = document.createElement("a");
        a.href = lastUrl;
        a.innerText = lastText;
        lastAnime.appendChild(a);
        return this.lastAnime;
      })
      .catch((err) => {
        console.error(err);
        const lastAnime = document.querySelector(".lastAnime");
        // set text to the element
        lastAnime.innerText = `Yikes, An error happened :c ${err.response.status} ${err.response.statusText}`;
      })
  },
  methods: {
    anilist() {

    }
  },
  // created() {
  //   // add twitter card to head
  //   document.head.innerHTML += `<meta name="twitter:card" content="summary" />`;
  //   document.head.innerHTML += `<meta name="twitter:site" content="@Asthriona" />`;
  //   document.head.innerHTML += `<meta name="twitter:title" content="Asthriona.space" />`;
  //   document.head.innerHTML += `<meta name="twitter:description" content="a place for random stuff." />`;
  //   document.head.innerHTML += `<meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1478732294659706880/Bdqut4ya_400x400.jpg" />`;
  //   document.head.innerHTML += `<meta name="twitter:creator" content="@Asthriona" />`;

  //   this.chosenLine =
  //     this.rdmText[Math.floor(Math.random() * this.rdmText.length)];
  //   axios.get('https://api.github.com/users/Asthriona/events')
  //   .then(res => {
  //     this.gitHub.commits = res.data[0].payload;
  //     this.gitHub.repo = res.data[0].repo;
  //   })
  // },
};
</script>

<style scoped>
@font-face {
  font-family: Asthriona;
  src: url(../assets/font/logofont.ttf) format("truetype");
}

.head-banner {
  background-image: url(https://cdn.asthriona.com/i/2022/05/nihon-graphy-eeUmYVTkFg4-unsplash.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  width: 100%;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
}

.font-logo {
  font-family: Asthriona !important;
  color: #000;
  -webkit-text-stroke: 3px #fff;
}

.randomText {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.muted {
  color: #999;
  font-size: 0.8em;
}
</style>