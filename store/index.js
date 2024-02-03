import {defineStore} from 'pinia';
import { theme } from 'ant-design-vue';
export const SateManegment = defineStore('index' , {
    state:()=>{
        return{
            message: null,
            themeApp: {
                algorithm: theme.darkAlgorithm,
            }
        }
    },
    actions:{
        setTheme(value){
            this.themeApp.algorithm = value;
        },
        setMessage(value){
            this.message = value;
        }
    }
})