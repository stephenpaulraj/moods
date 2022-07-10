<template>
  <nav class="navbar navbar-dark mt-3" style="margin-left: 5%">
    <div class="container-fluid">
      <img src="@/assets/logo@4x.png" style="height: 30px" />
      <form class="d-flex" style="margin-right: 5%">
        <img src="@/assets/playit@4x.png" style="height: 25px" />
      </form>
    </div>
  </nav>
  <div class="d-flex justify-content-center">
    <div class="mt-5 text-center">
      <h1
        class="h1-responsive text-align-center"
        style="font-weight: 800; font-size: 36px"
      >
        Tick. Tock. Boom. Boom
      </h1>
      <div class="d-flex justify-content-center">
        <h6>The World's Population is about to explode. Time's running out.</h6>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <div class="mt-2 text-center">
      <div class="d-flex justify-content-center">
        <h4>#WorldPopulationDay</h4>
      </div>
    </div>
  </div>
  <div class="d-flex justify-content-center">
    <!-- <img src="@/assets/bomb@4x.png" height="300" /> -->
    <Vue3Lottie
      ref="customControl"
      :animationData="BombJSON"
      :height="300"
      :width="300"
      :autoPlay="false"
      :loop="false"
      @onEnterFrame="completed++"
    />
  </div>

  <div v-if="!isStartButtonHidden" class="d-flex justify-content-center">
    <div class="mt-1 text-center">
      <div class="d-flex justify-content-center">
        <h6>You can stop it, if you can act now!!</h6>
      </div>
      <div class="d-flex justify-content-center">
        <h6>Guess the code to stop the Explosion</h6>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center mt-1 mb-3">
    <button
      type="button"
      v-if="!isStartButtonHidden"
      class="btn btn-default btn-block"
      @click="buttonToggle()"
      style="
        background-color: #b9e5fc;
        color: black;
        font-weight: 800;
        font-size: 32px;
      "
    >
      Let's start the Game
    </button>
    <div v-if="!isAnswerBoxHidden" class="d-flex justify-content-center">
      <div>
        <p style="font-size: 18px">{{ hint }}</p>
      </div>
    </div>
  </div>

  <div
    v-if="!isAnswerBoxHidden"
    class="container d-flex justify-content-center"
  >
    <Form class="row g-3 justify-content-center" @submit="checkAnswer()">
      <div class="col-auto">
        <label for="subAnswer" class="visually-hidden">Answer</label>
        <Field
          v-model="subAnswer"
          name="subAnswer"
          type="text"
          class="form-control"
          placeholder="Your Answer"
          autocomplete="off"
          :rules="validateEmail"
        />
        <ErrorMessage name="subAnswer" />
      </div>
      <div class="col-auto">
        <button
          class="btn btn-primary mb-3"
          style="background-color: #b9e5fc; color: black"
        >
          Enter your answer
        </button>
      </div>
    </Form>
  </div>

  <div v-if="isSuccessDialogHidden" class="d-flex justify-content-center mb-4">
    <div
      v-if="isSuccessDialogHidden"
      class="row"
      style="background-color: black"
      role="alert"
    >
      <h1
        class="d-flex justify-content-center text-center"
        style="font-weight: 900; font-size: 45px; color: white"
      >
        Congrats!! You made it happen.
      </h1>

      <div class="row justify-content-center text-center">
        <div class="col-lg-3 justify-content-center">
          <!-- sm circle button-->
          <ShareNetwork
            network="twitter"
            url="https://www.moodsplanet.com/"
            title="Control population not your Pleasures."
            description="Explore our entire line of MOODS condoms, lubricants and more. Discover new flavours and variants to enhance all your sexual experiences."
            quote="Control population not your Pleasures."
            hashtags="moods"
            twitterUser="@MoodsCondoms"
          >
            <button
              class="btn btn-circle btn-circle-sm m-1"
              style="background-color: #1da1f2; color: white"
            >
              <i class="bi bi-twitter"></i>
            </button>
          </ShareNetwork>
          <ShareNetwork
            network="facebook"
            url="https://www.moodsplanet.com/"
            title="Control population not your Pleasures."
            description="Explore our entire line of MOODS condoms, lubricants and more. Discover new flavours and variants to enhance all your sexual experiences."
            quote="Control population not your Pleasures."
            hashtags="moods"
            twitterUser="@MoodsCondoms"
          >
            <button
              class="btn btn-circle btn-circle-sm m-1"
              style="background-color: #4267b2; color: white"
            >
              <i class="bi bi-facebook"></i>
            </button>
          </ShareNetwork>

          <ShareNetwork
            network="whatsapp"
            url="https://www.moodsplanet.com/"
            title="Control population not your Pleasures."
            description="Explore our entire line of MOODS condoms, lubricants and more. Discover new flavours and variants to enhance all your sexual experiences."
            quote="Control population not your Pleasures."
            hashtags="moods"
            twitterUser="@MoodsCondoms"
          >
            <button
              class="btn btn-circle btn-circle-sm m-1"
              style="background-color: #25d366; color: white"
            >
              <i class="bi bi-whatsapp"></i>
            </button>
          </ShareNetwork>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isFailedDialogHidden" class="d-flex justify-content-center">
    <div
      class="row col-md-4 alert"
      role="alert"
      style="background-color: #fd1d1d"
    >
      <h1
        class="d-flex justify-content-center text-center"
        style="font-weight: 900; font-size: 36px; color: white"
      >
        Oh, no! That was a miss!! Don't give up so soon.
      </h1>

      <hr />
      <div class="d-flex justify-content-center">
        <button
          @click="reloadPage()"
          class="btn btn-lg"
          style="background-color: white; color: black"
        >
          Start Over
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue3Lottie } from "vue3-lottie";
import BombJSON from "@/assets/static_bomb.json";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  name: "App",
  components: {
    Vue3Lottie,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      hints: [
        { Hint: "Always Play It Right with", Answer: "Moods Condoms" },
        {
          Hint: "Ready for a full night of action with",
          Answer: "Moods Allnight",
        },
        { Hint: "Flavour up your romance with", Answer: "Moods Allnight" },
        { Hint: "Lets get Fruity with", Answer: "Moods Strawberry" },
        { Hint: "Five times the pleasure with", Answer: "Moods 1500 dots" },
        {
          Hint: "Add some spark to your lovemaking with",
          Answer: "Moods Electrify",
        },
      ],
      BombJSON,
      isAnswerBoxHidden: true,
      isStartButtonHidden: false,
      isSuccessDialogHidden: false,
      isFailedDialogHidden: false,
      hint: "",
      answer: "",
      subAnswer: "",
      completed: 0,
    };
  },
  watch: {
    completed(newVal, oldVal) {
      if (newVal > 1800) {
        this.changepage();
        console.log(oldVal);
      }
    },
  },
  methods: {
    play() {
      this.$refs["customControl"].play();
    },
    pause() {
      this.$refs["customControl"].pause();
    },
    buttonToggle() {
      this.isAnswerBoxHidden = false;
      this.isStartButtonHidden = true;
      this.$refs["customControl"].play();
      const random = Math.floor(Math.random() * this.hints.length);
      console.log(random, this.hints[random]);
      this.hint = this.hints[random].Hint;
      this.answer = this.hints[random].Answer.toLowerCase();
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return "Provide with an Answer";
      }
      return true;
    },
    checkAnswer() {
      this.isAnswerBoxHidden = true;
      if (this.answer == this.subAnswer.toLowerCase()) {
        this.isSuccessDialogHidden = true;
        this.$refs["customControl"].pause();
      } else {
        this.$refs["customControl"].goToAndPlay(900, true);
        this.isFailedDialogHidden = true;
      }
    },

    changepage() {
      this.isAnswerBoxHidden = true;
      this.isFailedDialogHidden = true;
    },
    reloadPage() {
      window.location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: "Arial", sans-serif;
  -moz-osx-font-smoothing: grayscale;
  color: whitesmoke;
  background-color: black;
}
body {
  background: black !important;
}

.btn-circle {
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  padding: 0;
  border-radius: 50%;
}

.btn-circle i {
  position: relative;
  top: -1px;
}

.btn-circle-sm {
  width: 35px;
  height: 35px;
  line-height: 35px;
  font-size: 0.9rem;
}

.btn-circle-lg {
  width: 55px;
  height: 55px;
  line-height: 55px;
  font-size: 1.1rem;
}

.btn-circle-xl {
  width: 70px;
  height: 70px;
  line-height: 70px;
  font-size: 1.3rem;
}

.btn-xl {
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 10px;
  width: 100%;
}
</style>
