import { useEffect } from "react"
import { useAuth } from "../store/Auth"

export const AdminContacts = () => {

    
    const { authorizationToken } = useAuth()

    const getContactsData = async () => {
        try {
            const response = await fetch("http://localhost:5000/admin/contacts",{
                method: "GET",
                headers : {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json()
            console.log("Contact Data",data)
            if(response.ok){
                console.log(response)
            }
        } catch (error) {
                console.log(error)
        }
    }




    useEffect(() =>{
        getContactsData(); 
    },[])

    return (
        <>
            <h1>Hello Tech Contact Data</h1>
        </>
    )
}