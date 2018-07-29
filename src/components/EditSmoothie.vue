<template>
    <div v-if='smoothie' class="edit-smoothie container">
        <h2>Edit {{ smoothie.title}} Smoothie</h2>
        <form @submit.prevent='editSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title: </label>
                <input type="text" name='title' v-model='smoothie.title'>
            </div>
            <div v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <div class="field added">
                    <i class="material-icons done">done</i>
                    <i class="material-icons delete" @click='deleteIng(ingredient)'>delete</i>
                    <label for="add-ingredient">Ingredient added: (Still can be modified) </label>
                    <input type="text" name='add-ingredient' v-model="smoothie.ingredients[index]">
                </div>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient: (Press Tab to add) </label>
                <input type="text" name='add-ingredient' @keydown.tab.prevent='addIng' v-model="ing">
            </div>
            <div class="field center-align">
                <p v-if='feedback' class="red-text">{{ feedback }}</p>
                <!-- <p v-if='title1' class="red-text">{{ title1 }}</p> -->
                <button class="btn pink">Add smoothie</button>
            </div>
        </form>  
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'EditSmoothie',
    data(){
        return {
            smoothie: null,
            ing: null,
            feedback: null
        }
    },
    methods: {
        addIng(){
            if(this.ing){
                this.smoothie.ingredients.push(this.ing);
                this.ing = null;
                this.feedback = null; 
            }else{
                this.feedback = 'You have to enter a value to add an ingredient'
            }
        }, 
        deleteIng(ingredient){
            this.smoothie.ingredients = this.smoothie.ingredients.filter(el => el !== ingredient);
        },
        editSmoothie(){
            if(this.smoothie.title && this.smoothie.ingredients.length > 0){
                this.feedback = null
                this.smoothie.slug = slugify(this.smoothie.title, {
                    replacement: '-',      // replace spaces with replacement
                    remove: /[$*_+~.()'"!\-:@]/g,        // regex to remove characters
                    lower: true          // result in lower case
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    slug: this.smoothie.slug,
                    ingredients: this.smoothie.ingredients,
                    timestamp: new Date()
                }).then(() => {
                    this.$router.push({name: 'Index'});
                }).catch((err) => {
                    console.log(err);
                });
            }
            else{
                this.feedback = 'You have to enter a title/ingredient to add a smoothie'
            }
        }
    },
    created(){
        let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_id);
        ref.get().then(snapshot => {
            snapshot.forEach(smoothie => {
                this.smoothie = smoothie.data();
                this.smoothie.id = smoothie.id;
            })
        });
    }
}
</script>

<style>
    .edit-smoothie{
        max-width: 500px;
        margin-top: 60px;
        padding: 20px;
    }

    .edit-smoothie h2{
        font-size: 2em;
    }

    .edit-smoothie .field{
        margin: 20px;
    }

    .edit-smoothie .added{
        position: relative;
    }
    .edit-smoothie .added i{
        position: absolute;
        top: 40px;
        right: 10px;
        font-size: 1.2em;
        color: #aaa;
        cursor: pointer;
    }
    .edit-smoothie .added .done{
        top: 40px;
        right: 40px;
    }
    .edit-smoothie .added .delete{
        top: 40px;
        right: 10px;
    }
</style>
