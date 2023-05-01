<template>
    <form class="border-form-2 p-4 border-secondary">
        <div class="mb-3">
            <label for="inputName" class="form-label">Podaj nazwę ogłoszenia</label>
            <input type="text" maxlength="50" class="form-control" id="inputName" placeholder="Maksymalna długość to 50 znaków" />
        </div>

        <div class="mb-3 d-flex justify-content-between">
            <div class="w-75 me-2">
                <label for="inputCategory" class="form-label">Wybierz kategorię dla swojego ogłoszenia</label>
                <select type="text" class="form-control" id="inputCategory" placeholder="Maksymalna długość to 50 znaków" >
            </select>
            </div>
            <div class="w-25 ms-2">
                <label for="inputPrice" class="form-label">Cena</label>
                <input type="number" pattern = "[0-9]" class="form-control" id="inputPrice" placeholder="99.99" >
            </div>
        </div>

        <div class="mb-3">
            <label for="inputDescription" class="form-label">Podaj opis</label>
            <textarea wrap="soft" rows="10" maxlength="1024" minlength="100" class="form-control" id="inputDescription" placeholder="Przekonaj kupującego, że warto!"></textarea>
        </div>

        <div class="mb-3">
            <label for="inputFile" class="form-label">Załącz zdjęcia</label>
            <input type="file" accept="image/*" class="form-control" id="inputFile" multiple/>
        </div>
        <div class="mb-3 d-flex">
            <input type="button" value="Dodaj ogłoszenie" class="btn btn-secondary text-white"  />
        </div>
    </form>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Product } from '@/data/entities';


export default defineComponent({
    name: "ProductForm",
    

});

</script>