import { deleteData } from 'lib/functions/sqlFunctions'
import React, 
    {  
        PropsWithChildren, 
        ReactElement, 
        useState,
        useEffect
    } 
from 'react'
import AddModal from './AddModal'
import { Bars } from 'react-loader-spinner'

type TableCompProps = {
    title: string,
    titleHeader: string,
    headers: string[],
    items: any,
    fields: Array<{ field: string, type: string  }>
    loading: boolean
    setReloadItems: (data: any) => void
}

const TableComp = ({title, titleHeader, headers, items, fields, loading, setReloadItems} : PropsWithChildren<TableCompProps>) : ReactElement => {
    const [itemsContent, setItemsContent] : any[] = useState()
    const [action, setAction] = useState(0) /*0 to add, 1 to edit*/
    const [dataToEdit, setDataToEdit] = useState()
    const [show, setShow] = useState(false)

    const addItem = async(data: typeof items) => {
        try {
            setReloadItems(true)
        } catch (error) {
            console.error(error)
        }        
    }

    const updateRow = async (id: number, newData: any) => {
        try {
            await setItemsContent(items.map((data: any) => (data.id === id ? newData : data)))
        } catch (error) {
            console.error(error)
        }        
    }
    
    const deleteFromList = async (id: number) : Promise<any> => {
        var itemsFiltered : any
        if (confirm("¿Deseas eliminar este registro?")){
            try { await deleteData(title, id)
                .then(() => itemsFiltered = items.filter((data: any) => data.id !== id))
                .then(() => alert('Registro eliminado'))
                .then(() => setItemsContent(itemsFiltered))
            } catch (error) {
                console.error(error)
            }
        }
    }

    useEffect(() => {
        setItemsContent(items)
    }, [items])

    const changeToNew = (): void => {
        setAction(0)
        setDataToEdit(undefined)        
        setShow(true)
    }

    const changeToEdit = (item: any): void => {
        setAction(1)
        setDataToEdit(item)        
        setShow(true)
    }

    return (
        <div>
            <div className="page">
                {loading ? (
                    <div className="m-6">
                        <Bars height="80"
                            width="80"
                            color="#0798e8"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true} />
                    </div>
                ) : (
                <div>
                    <div className='m-6'>
                        <h1>{titleHeader}</h1>
                        <div>
                            <table className='w-full h-full'>
                                <thead>
                                <tr>
                                    {headers &&
                                    headers.map((value, idx) => (
                                        <th
                                        scope="col"
                                        key={`table-header-${idx}`}
                                        >
                                        {value}
                                        </th>
                                    ))}
                                    <th
                                    scope="col"
                                    key={`table-header-edit`}
                                    >
                                    </th>
                                    <th
                                    scope="col"
                                    key={`table-header-delete`}
                                    >
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {itemsContent && itemsContent.length > 0 ? (
                                    itemsContent.map((item : any) => (
                                    <tr key={`table-${item.id}`}>
                                        {fields.map((field, idx) => (
                                            <td
                                            key={`table-${field.field}-${idx}`}
                                            title={field.field}
                                            >
                                                {item[field.field]}
                                            </td>
                                        ))}
                                        <td
                                            key={`table-edit-button`}
                                            title="edit-button"
                                            onClick={() => changeToEdit(item)}
                                            >
                                                <button
                                                className='table-button'>
                                                    Editar
                                                </button>                                                
                                        </td>
                                        <td
                                            key={`table-delete-button`}
                                            title="delete-button"
                                            >
                                                <button
                                                className='table-button'
                                                onClick={() => deleteFromList(item.id)}>
                                                    Borrar
                                                </button>                                                
                                        </td>
                                    </tr>)
                                )) : (
                                    <tr className="empty" key="crud-table-test-empty">
                                        <td colSpan={headers.length + 2}>No Records Added Yet</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button
                                id="myBtn"
                                className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                                onClick={() => changeToNew()}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                    <div>
                        <AddModal 
                        title={title}
                        item={dataToEdit}
                        fields={fields} 
                        headers={headers}
                        addItem={addItem}
                        action={action}
                        setAction={setAction}
                        updateRow={updateRow}
                        show={show}
                        setShow={setShow}/>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default TableComp