const token = "Bearer 5792a0c511b36f6d3101cf969c4ed3e5c07f32ef20cc074e9bdbb9d759ac8d33"

export const getUsers = async function(){
    return await (await fetch("https://gorest.co.in/public/v2/users")).json()
}
export const getUser = async function(id){
    return await (await fetch(`https://gorest.co.in/public/v2/users/${id}`)).json()
}
export const putUser = async function(user){
    const url = `https://gorest.co.in/public/v2/users/${user.id}`
    const body = JSON.stringify(user)
    const result = await fetch(url,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        body: body
    })
    return await result.json()
}