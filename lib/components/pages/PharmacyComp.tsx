import React, { useState, useEffect } from 'react'
import { selectData } from 'lib/functions/sqlFunctions'
import TableComp from '../TableComp'

const PharmacyComp = () => {
    const [items, setItems] = useState<any>()
    const [loading, setLoading] = useState(true)
    const [reloadItems, setReloadItems] = useState(false)
    const fields : field = [{field: 'name', type: 'string'}, {field: 'minProd', type: 'number'}, {field: 'maxProd', type: 'number'}]
    const headers = ['Nombre', 'Almacenaje mínimo', 'Almacenaje máximo']
    const title = "Pharmacy"
    const titleHeader = "Farmacias"
    
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

export default PharmacyComp