import { selectData } from 'lib/functions/sqlFunctions'
import React, { useEffect, useState } from 'react'
import TableComp from '../TableComp'

const ProductsComp = () => {
    const [items, setItems] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [reloadItems, setReloadItems] = useState(false)
    const fields : field = [{field: 'name', type: 'string'}, {field: 'total', type: 'number'}, {field: 'remaining', type: 'number'} , {field: 'pharmacy', type: 'string'}]
    const headers = ['Nombre', 'Total para almacenar', 'Restantes', 'Farmacia']
    const title = "Products"
    const titleHeader = "Productos"
    
    type field = Array<{
        field: string,
        type: string
    }> | undefined

    const getItems = async () => {
        try { await selectData(title)
            .then((data) => setItems(data))
            .finally(() => setLoading(false))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    useEffect(() => {
        if (reloadItems === true) {
            getItems()
            setReloadItems(false)
        }
    }, [reloadItems])

    return (
        <div>
            <TableComp
                title={title}
                titleHeader={titleHeader}
                headers={headers}
                items={items}
                fields={fields}
                loading={loading}
                setReloadItems={setReloadItems}
            />
        </div>
    )
}

export default ProductsComp