<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add new smoothie recipe</h2>
        <form @submit.prevent='addSmoothie'>
            <div class="field title">
                <label for="title">Smoothie Title: </label>
                <input type="text" name='title' v-model='title'>
            </div>
            <div v-for="(ingredient, index) in ingredients" :key="index">
                <div class="field added">
                    <i class="material-icons done">done</i>
                    <i class="material-icons delete" @click='deleteIng(ingredient)'>delete</i>
                    <label for="add-ingredient">Ingredient added: (Still can be modified) </label>
                    <input type="text" name='add-ingredient' v-model="ingredients[index]">
                </div>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an ingredient: (Press Tab to add) </label>
                <input type="text" name='add-ingredient' @keydown.tab.prevent='addIng' v-model="ing">
            </div>
            <div class="field center-align">
                <p v-if='feedback' class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add smoothie</button>
            </div>
        </form>  
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'AddSmoothie',
    data(){ 
        return {
            title: null,
            ing: null,
            feedback:null,
            ingredients: [],
            slug: null
        }
    }, 
    methods:{
        addIng(){
            if(this.ing){
                this.ingredients.push(this.ing);
                this.ing = null;
                this.feedback = null; 
            }else{
                this.feedback = 'You have to enter a value to add an ingredient'
            }
        },   
        addSmoothie(){
            if(this.title && this.ingredients.length > 0){
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',      // replace spaces with replacement
                    remove: /[$*_+~.()'"!\-:@]/g,        // regex to remove characters
                    lower: true          // result in lower case
                })
                db.collection('smoothies').add({
                    title: this.title,
                    slug: this.slug,
                    ingredients: this.ingredients,
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
        },
        deleteIng(ingredient){
            this.ingredients = this.ingredients.filter(el => el !== ingredient);
        }
    }

}
</script>

<style>
    .add-smoothie{
        max-width: 500px;
        margin-top: 60px;
        padding: 20px;
    }

    .add-smoothie h2{
        font-size: 2em;
    }

    .add-smoothie .field{
        margin: 20px;
    }

    .add-smoothie .added{
        position: relative;
    }
    .add-smoothie .added i{
        position: absolute;
        top: 40px;
        right: 10px;
        font-size: 1.2em;
        color: #aaa;
        cursor: pointer;
    }
    .add-smoothie .added .done{
        top: 40px;
        right: 40px;
    }
    .add-smoothie .added .delete{
        top: 40px;
        right: 10px;
    }
</style>
