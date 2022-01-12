//import Observer from 'Observer'

export async function sort(sortRequest) {
    const res =  await fetch('http://192.168.0.13:8080/sort',
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            method: "POST",
            body: JSON.stringify(sortRequest)
        })

    return res.body.getReader();
}

export async function getAvailableAlgo()
{
    const res = await fetch('http://192.168.0.13:8080/')

    return await res.json();
}

