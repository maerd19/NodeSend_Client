import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import appContext from './../context/app/appContext';

const Dropzone = () => {

    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = useContext(appContext);

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, el limite es 1MB, obten una cuenta gratis para subir archivos mas grandes');
    }

    // useCallback se utiliza para optimizar el rendimiento de carga de archivos
    // Todos los archivos que usen la funcionalidad de arrastrar se manejaran en esta funcion
    // acceptedFiles contendra los archivos que se subiran
    const onDropAccepted = useCallback( async (acceptedFiles) => {        
        // Crear un form Data para poder subit archivos
        // Dado que estos archivos no son texto plano es necesario un formulario para poder subirlos al endpoint
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        subirArchivo(formData, acceptedFiles[0].path);
    }, []);

    // Extraer contenido de Dropzone
    // onDropAccepted almacena los archivos que cumplan con las reglas
    // onDropRejected almacena los archivos que no cumplan con las reglas
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDropAccepted, onDropRejected, maxSize: 1000000});

    const archivos = acceptedFiles.map( archivo => (
        <li key={archivo.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
            <p className="font-bold text-xl">{archivo.path}</p>
            <p className="text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ) );    

    return (
        <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">

            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        {archivos}
                    </ul>

                    { cargando ? <p className="my-10 text-center text-gray-600">Subiendo Archivo...</p> :  
                        <button
                            type="button"
                            className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                            onClick={crearEnlace}
                        >
                            Crear enlace
                        </button>
                    }
                    
                </div>
                
            ) : (
                <div { ...getRootProps({ className: 'dropzone w-full py-32' }) }>
                    <input className="h=100" {...getInputProps()} />
                    
                        {
                            isDragActive ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> : 
                            <div className="text-center">
                                <p className="text-2xl text-center text-gray-600">Selecciona un archivo y arrastralo aqui</p>
                                <button className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800" type="button">
                                    Selecciona archivos para subir
                                </button>
                            </div>
                        }                    
                </div>
            ) }                        
        </div>
    );
};

export default Dropzone;