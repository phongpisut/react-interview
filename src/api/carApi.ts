import {Axios} from "api"
import { useQuery , useMutation } from 'react-query'



type GetCarListParams = {
    search : string
    order : string
}

type GetDataParams = {
    search : string
    order : string
    content_type : string,
    field_search:string
}

const getData = async ({search , order,content_type , field_search}:GetDataParams) =>{
    const {data} = await Axios.get('/',{
        params:{
            content_type,
            [field_search]: search,
            order
        }
    })
    return data
}


export function useGetCar(params:GetCarListParams){
    return useQuery(["carList",params],()=>getData({...params,content_type:'car',field_search:"fields.title[match]"}))
}

export function useGetDiscount(){
    return useMutation((search:string)=>getData({search:search || '-', order:'', content_type:'discount',field_search:"fields.code" }))
}


