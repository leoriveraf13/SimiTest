import { selectData } from 'lib/functions/sqlFunctions'
import React, { useEffect, useState } from 'react'

const InventoryComp = () => {
    const [items, setItems] = useState<any>()
    const fields : field = [{field: 'name'}, {field: 'remaining'}, {field: 'sold'}, {field: 'total'}, {field: 'pharmacy'}]
    const Headers = ['Nombre', 'En stock', 'Vendidos', 'Total', 'Farmacia']
    
    type field = Array<{
        field: string
    }> | undefined
    
    const getItems = async () => {
        try { await selectData('Products')
            .then((data) => setItems(data))
        } catch (e) {
            console.log(e)
        }
      }

    useEffect(() => {
        getItems()
    }, [])
    
    return (
        <div>
            <div className="page">
                <div>
                    <div className='m-6'>
                        <h1>Inventario</h1>
                        <div>
                            <table className='w-full h-full'>
                                <thead>
                                <tr>
                                    {Headers &&
                                    Headers.map((value, idx) => (
                                        <th
                                        scope="col"
                                        key={`table-${idx}`}
                                        >
                                        {value}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {items && items.length > 0 ? (
                                    items.map((item : any) => {
                                        var color: string
                                        var percent : number = (parseInt(item.remaining) * 100) / parseInt(item.total)
                                        return(
                                        <tr key={`table-pharmacy-${item.id}`}>
                                            {fields.map((field) => (
                                                <td
                                                key={`table-${item.id}-${field}`}
                                                style={field.field === 'remaining' ?
                                                {
                                                    backgroundColor: color
                                                } : {}}
                                                title={field.field}
                                                >
                                                    {field.field !== 'sold' ? item[field.field] : item.total - item.remaining}
                                                </td>
                                            ))}
                                        </tr>
                                    )})
                                ) : (
                                    <tr className="empty" key="crud-table-test-empty">
                                    <td colSpan={3}>No Records Added Yet</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InventoryComp