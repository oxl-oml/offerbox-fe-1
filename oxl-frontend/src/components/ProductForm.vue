<template>

    <AlertComponent class="h-100" v-if="cAlert" :alert="cAlert"/>
   

    <form class="border-form-2 p-4 border-secondary" @submit.prevent="tryAddProduct()">
        <div class="mb-3">
            <label for="inputName" class="form-label">Podaj nazwę ogłoszenia</label>
            <input v-model="productForm.name" type="text" maxlength="50" class="form-control" id="inputName" placeholder="Maksymalna długość to 50 znaków" required/>
        </div>

        <div class="mb-3 d-flex justify-content-between align-items-around">
            <div class="w-75 me-2 h-100">
                <label for="inputCategory" class="form-label">Wybierz kategorię dla swojego ogłoszenia</label>
                <select v-model="productForm.categoryId" class="form-control" id="inputCategory">
                    <option  v-for="category in (trueCategories as Category[])" :value="category.dbaseId">{{ category.name }}</option>
                </select>
            </div>
            <div class="w-25 ms-2 h-100">
                <label for="inputPrice" class="form-label">Cena</label>
                <input v-model="productForm.price" type="number" pattern = "[0-9]" class="form-control" id="inputPrice" placeholder="99.99" required>
            </div>
        </div>

        <div class="mb-3">
            <label for="inputDescription" class="form-label">Podaj opis</label>
            <textarea v-model="productForm.description" wrap="soft" rows="10" maxlength="1024" minlength="100" class="form-control" id="inputDescription" placeholder="Przekonaj kupującego, że warto!" required></textarea>
        </div>

        <div class="mb-3">
            <label for="inputFile" class="form-label">Załącz zdjęcia (Obecnie możliwe tylko dołączanie URL)!</label>
            <input type="file" accept="image/*" class="form-control" id="inputFile" multiple disabled/>
        </div>
        <div class="mb-3">
            <label for="inputUrl" class="form-label">Dodaj adresy URL zdjęć oddzielone przecinkami</label>
            <textarea v-model="productForm.images" :pattern="urlRegex" wrap="soft" rows="3" maxlength="256" minlength="0" class="form-control" id="inputUrl" placeholder="np. http://domena.com/zdjecie.png"></textarea>
        </div>

        <div class="mb-3 d-flex">
            <input type="submit" value="Dodaj ogłoszenie" class="btn btn-secondary text-white"  />
        </div>
    </form>


</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import { Category, Product } from '@/data/entities';
import { mapActions, mapGetters, mapMutations, useStore } from 'vuex';
import { HttpHandler } from '@/data/httpHandler';
import {AddProductResponse, DefaultErrorResponse, Alert, AlertTypes, NewProductForm} from '@/data/entities'
import AlertComponent from './AlertComponent.vue';


export default defineComponent({
    name: "ProductForm",
    setup() {
        const httpHandler: HttpHandler = new HttpHandler();
        const store = useStore();
        onMounted(() => {
            store.dispatch("loadCategories", httpHandler.loadCategories);
        });
    },
    data() {
        var productForm: NewProductForm = new NewProductForm("", "", 0, 0, 0, []);
        var cAlert: any = null;
        return {
            store: useStore(),
            urlRegex: "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)",
            productForm: productForm,
            cAlert: cAlert
        };
    },
    computed: {
        ...mapGetters(["trueCategories", "actualAlert"]),
    },
    methods: {
        ...mapActions({
            addProduct: "addProduct"
        }),
        ...mapMutations({
            setActualAlert: "setActualAlert"
        }),
        tryAddProduct() {
            this.cAlert = null;
            console.log("Submit clicked");
            //this.$emit("TryRegister");
            this.addProduct(() => {
                return new HttpHandler().addProduct(this.productForm)
                    .then((data: AddProductResponse | DefaultErrorResponse) => {
                    var alert: Alert = ((data as AddProductResponse).productId) ? (new Alert(AlertTypes.INFORMATION, "Pomyślnie dodano ogłoszenie")) : (new Alert(AlertTypes.ERROR, (data as DefaultErrorResponse).details as string | "Nieznany błąd"));
                    this.setActualAlert(alert);
                    (this.cAlert as Alert) = alert;
                    if ((data as AddProductResponse).productId) {
                        console.log("Product addition success");
                        this.$router.push({ path: `/products/${(data as AddProductResponse).productId}` });
                    }
                    if ((data as DefaultErrorResponse).details) {
                        console.log("Product addition fail");
                        //this.$emit("TryRegister");
                    }
                    console.log(data);
                })
                    .catch((error: any) => { this.setActualAlert(new Alert(AlertTypes.ERROR, error as string | "Nieznany błąd")); });
            });
        }
    },
    components: { AlertComponent }
});

</script>