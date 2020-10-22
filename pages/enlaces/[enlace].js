import Layout from './../../components/Layout';
import clienteAxios from './../../config/axios';

// Una de las caracteristicas mas avanzadas de next es prefetching y prerendering.
// Es decir antes de que alguien visite el sitio web ya se estan generando los archivos estaticos.
// Para ello next nos da dos funciones: 

export async function getServerSideProps({params}) {
    const { enlace } = params;
    // console.log(enlace);
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
    // console.log(resultado);

    return {
        props: {
            enlace: resultado.data
        }
    }
}

// Nos permitira generar diferentes URL's de todo el contenido dinamico
export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');
    console.log(enlaces);

    return {
        paths: enlaces.data.enlaces.map( enlace => ( {
            params: { enlace : enlace.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {
    console.log(enlace);
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo</h1>
            <div className="flex items-center justify-center mt-10">
                <a href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                   className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                >
                    Aqui
                </a>
            </div>
        </Layout>
    )
}