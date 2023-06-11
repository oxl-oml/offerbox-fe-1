<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8">
        <h5>Dane</h5>
        <hr class="mt-0 mb-4">
        <div class="card mb-4">
          <div class="card-body">

            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Imię i Nazwisko</p>
              </div>
              <div class="col-sm-9">
                <input type="text" class="transparent-input mb-0" :value="context.currentUser.firstName"
                       placeholder="Imię...">
                <input type="text" class="transparent-input mb-0" :value="context.currentUser.lastName"
                       placeholder="Nazwisko...">
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ context.currentUser.email ?? "" }}</p>
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Nr. telefonu</p>
              </div>
              <div class="col-sm-9 d-flex flex-row w-auto">
                <span class="text-muted mb-0">+48</span>
                &nbsp;
                <input type="tel" class="transparent-input w-auto mb-0" :value="context.currentUser.phoneNumber"
                       placeholder="Nr. Telefonu...">
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Status konta</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">{{ context.currentUser.accountStatus ?? "" }} -
                  {{ UserAccountStatus.translate(context.currentUser.accountStatus) }}</p>
                <span v-if="context.currentUser.accountStatus === 'U'" class="form-text" style="color: red;">
                  <i class="bi bi-exclamation-circle"></i>
                  Twoje konto nie jest zweryfikowane. Możesz nie mieć dostępu do niektórych funkcjonalności. Kliknij w link w wiadomości przesłanej mailem by dokończyc aktywacje konta.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <div class="card-body">
            <h5>Zmiana hasła</h5>
            <hr class="mt-0">

            <form class="border-form-r p-2 border-secondary" @submit.prevent="tryChangePassword()">
              <div class="mb-3">
                <label for="inputOldPassword" class="form-label">Stare hasło</label>
                <div class="input-group">
                  <input v-model="passwordChangeData.oldPassword" v-bind:type="showPassword ? 'text' : 'password'"
                         class="form-control" id="inputOldPassword"
                         placeholder="Wpisz stare hasło..." required autocomplete/>
                  <div class="input-group-append">
                      <span role="button" class="input-group-text" @click="showPassword = !showPassword">
                      <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="inputNewPassword" class="form-label">Nowe hasło</label>
                <div class="input-group">
                  <input v-model="passwordChangeData.newPassword" v-bind:type="showPassword ? 'text' : 'password'"
                         class="form-control" id="inputNewPassword"
                         placeholder="Wpisz nowe hasło..." required autocomplete/>
                  <div class="input-group-append">
                      <span role="button" class="input-group-text" @click="showPassword = !showPassword">
                      <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="inputNewPasswordRepeat" class="form-label">Powtórz nowe hasło</label>
                <div class="input-group">
                  <input v-model="passwordChangeData.newPasswordRepeat" v-bind:type="showPassword ? 'text' : 'password'"
                         class="form-control" id="inputNewPasswordRepeat"
                         placeholder="Wpisz nowe hasło..." required autocomplete/>
                  <div class="input-group-append">
                      <span role="button" class="input-group-text" @click="showPassword = !showPassword">
                      <i class="fa" :class="[showPassword ? 'bi bi-eye' : 'bi bi-eye-slash']" aria-hidden="true"></i>
                    </span>
                  </div>
                </div>
              </div>

              <div class="mb-3 d-flex">
                <input type="submit" value="Zmień hasło"
                       class="btn btn-secondary text-white"/>
              </div>
              <div v-if="error" class="bad-data">
                <p>
                  <i class="bi bi-exclamation-circle"></i>
                  Nie udało się zmienić hasła, powód: <strong>{{ errorMsg }}</strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img :src="context.currentUser.profileImageUrl" alt="Avatar"
                 class="rounded-circle img-fluid object-fit-cover my-4" style="width: 300px; height: 300px"/>
            <div role="button" @click="toggleUpdateImage = !toggleUpdateImage">
              <i class="bi bi-file-image mb-5"></i>
            </div>
            <input v-if="toggleUpdateImage" :value="context.currentUser.profileImageUrl" type="url"
                   class="form-control"
                   placeholder="Wprowadź URL zdjęcia">
            <h5 class="my-3">{{ context.currentUser.firstName }} {{ context.currentUser.lastName }}</h5>
            <p class="text-muted mb-1">Rola: {{ context.currentUser.isAdmin ? "Administrator" : "Użytkownik" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import {mapActions, mapGetters, mapMutations} from 'vuex';
import {AccountStatus, Alert, AlertTypes, DefaultErrorResponse, User, UserAccountStatus} from "@/data/entities";
import {HttpHandler} from "@/data/httpHandler";


export default defineComponent({
  name: "UserPanelMyAccount",
  data() {
    return {
      error: false,
      errorMsg: "",
      showPassword: false,
      toggleUpdateImage: false,
      passwordChangeData: {
        oldPassword: "",
        newPassword: "",
        newPasswordRepeat: "",
      }
    }
  },
  computed: {
    UserAccountStatus() {
      return UserAccountStatus
    },
    AccountStatus() {
      return AccountStatus
    },
    User() {
      return User
    },
    ...mapGetters(["context"])
  },
  methods: {
    ...mapActions(["updateUserPassword"]),
    ...mapMutations({
      setActualAlert: "setActualAlert",
    }),

    tryChangePassword() {
      this.showPassword = false;
      this.updateUserPassword(() => {
        return new HttpHandler().updatePassword(this.passwordChangeData)
            .then(value => {
              if (!value) {
                return;
              }
              const err = value as DefaultErrorResponse;
              console.log("err", err);
              this.error = true;
              this.errorMsg = err.details;
              this.setActualAlert(new Alert(AlertTypes.ERROR, err.details))
            })
            .catch((error: DefaultErrorResponse) => {
              this.setActualAlert(new Alert(AlertTypes.ERROR, error.details))
            })
      });
    }
  }
});

</script>

<style scoped>
.bad-data {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-form-invalid-color);
}
input.transparent-input {
  background-color: rgba(0, 0, 0, 0) !important;
  border: none !important;
  outline: none;
}

input.transparent-input::placeholder {
  color: black;
}
</style>