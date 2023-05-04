import Axios from 'axios'

export const selectData = async(table: string): Promise<any> => {
    const { data } = await Axios.get(`http://localhost:3002/api/get${table}`)
    return data
}

export const insertData = async (table: string, values: any) => {
    const { data } = table === 'Pharmacy' ?
    await Axios.post(`http://localhost:3002/api/create${table}`, {
        name: values.name, 
        minProd: parseInt(values.minProd), 
        maxProd: parseInt(values.maxProd)
    }) :
    await Axios.post(`http://localhost:3002/api/create${table}`, {
        name: values.name, 
        total: parseInt(values.total), 
        remaining: parseInt(values.remaining), 
        pharmacy: values.pharmacy
    })
    return data
}

export const updateData = async (table: string, values: any, id: number) => {
    const { data } = table === 'Pharmacy' ?
    await Axios.post(`http://localhost:3002/api/update${table}/${id}`, {
        name: values.name, 
        minProd: parseInt(values.minProd), 
        maxProd: parseInt(values.maxProd)
    }) :
    await Axios.post(`http://localhost:3002/api/update${table}/${id}`, {
        name: values.name, 
        total: parseInt(values.total), 
        remaining: parseInt(values.remaining), 
        pharmacy: values.pharmacy
    })
    return data
}

export const deleteData = async (table: string, id: number) => {
    console.log(table)
    const { data } = table === 'Pharmacy' ?
    await Axios.delete(`http://localhost:3002/api/delete${table}/${id}`, {}) :
    await Axios.delete(`http://localhost:3002/api/delete${table}/${id}`, {})
    return data
}