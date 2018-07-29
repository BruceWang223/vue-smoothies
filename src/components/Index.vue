<template>
    <div class="index container">
        <div class="card" v-for='smoothie in smoothies' :key='smoothie.id'>
            <div class="card-content">
                <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
                <h2 class="indigo-text">{{ smoothie.title }}</h2>
                <ul class="ingredients">
                    <li v-for="(ingredient, index) in smoothie.ingredients" :key='index'>
                        <span class="chip">{{ ingredient }}</span>
                    </li>
                </ul>
            </div>
            <span class="btn-floating btn-large halfway-fab pink">
                <router-link :to = " { name: 'EditSmoothie', params: {smoothie_id : smoothie.slug} } ">
                    <i class="material-icons">edit</i> 
                </router-link>
            </span>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init';
export default {
    name: 'Index',
    data(){
        return{
            smoothies: []
        }
    },
    methods:{
        deleteSmoothie(id){
            db.collection('smoothies').doc(id).delete().then(() => {
                this.smoothies = this.smoothies.filter(el => el.id !== id);
            })
        }
    },
    created(){
        db.collection('smoothies').orderBy('timestamp').get().then(snapshot => {
            snapshot.forEach(el => {
                let newData = el.data();
                newData.id = el.id;
                this.smoothies.push(newData);
            })
        })
    }
}
</script>

<style>
    .index{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        margin-top: 60px;
        grid-column-gap: 20px;
    }

    .index h2{
        text-align: center;
        font-size: 1.8em;
        margin-top: 0;
    }

    .index .ingredients {
        margin: 30px auto;
    }

    .index .ingredients li{
        display: inline-block;
    }

    .index .delete{
        position: absolute;
        top: 10px;
        right:10px;
        cursor: pointer;
        font-size: 1.4em;
        color: #aaa;
    }
</style>
