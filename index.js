const fs = require('fs');

class ManagerUsuarios {
    static id = 0;

    constructor(ruta) {
        this.ruta = ruta;
        this.products = [];
        this.usuariosObj = {};
    }

    getProductId() {
        return ManagerUsuarios.id + 1;
    }

    getProductById(id) {
        const productoEncontrado = this.products.find(productoEncontrado => productoEncontrado.id === id)
        if(productoEncontrado){
            return console.log('Encontrado:', productoEncontrado);
        }else{
            console.log('Producto NO encotrado');
        }
    }

    crearArchivo = async () => {
            //this.products.push(obj);
            const cadenaArchivo = JSON.stringify(this.products);
            await fs.promises.writeFile(this.ruta, cadenaArchivo);
            console.log('Archivo creado');
    }

    llenarArchivo = async (obj) => {
        this.products.push(obj);
        const cadenaArchivo = JSON.stringify(this.products);
        await fs.promises.writeFile(this.ruta, cadenaArchivo);
        console.log('Archivo actualizado');
    }


    consultarArchivo = async () => {
        const usuarios = await fs.promises.readFile(this.ruta, 'utf-8');
        this.usuariosObj = JSON.parse(usuarios);
        this.usuariosObj.forEach((product) => {
            //console.log(product.title);
            //console.log(product.price);
            //console.log(product.code);
        })
        //console.log(this.usuariosObj.length);
        //console.log(this.products.length);
        //console.log(this.usuariosObj);
        //console.log(this.products);
    }


    addProduct = async (obj) => {
        
        const usuarios = await fs.promises.readFile(this.ruta, 'utf-8');
        this.usuariosObj = JSON.parse(usuarios);
        

        console.log(this.usuariosObj.code);
        console.log(this.usuariosObj.length); 

        
        if(this.usuariosObj.length === 0){
            const productoNuevo = {
                id: ManagerUsuarios.id = this.getProductId(),
                title: obj.title,
                description: obj.description,
                price: obj.price,
                code: obj.code,
                stock: obj.stock
            }
            this.usuariosObj.push(productoNuevo);
            this.llenarArchivo(productoNuevo);

        }else{
            this.usuariosObj.forEach((product) => {
                if(product.code === obj.code){
                    console.log('ERROR-CODIGO REPETIDO');
                }else{
                    const productoNuevo = {
                        id: ManagerUsuarios.id = this.getProductId(),
                        title: obj.title,
                        description: obj.description,
                        price: obj.price,
                        code: obj.code,
                        stock: obj.stock
                    }
                    this.usuariosObj.push(productoNuevo);
                    this.llenarArchivo(productoNuevo);
                }
            })
        } 
    }
    
}


const manager = new ManagerUsuarios('./usuarios.json');



manager.crearArchivo();

manager.addProduct({
    title: 'Computadora',
    description: 'interactivos',
    price: 300,
    code: '2222',
    stock: 20
});

manager.addProduct({
    title: 'Televisor',
    description: 'interactivos',
    price: 300,
    code: '1111',
    stock: 20
});

manager.addProduct({
    title: 'Heladera',
    description: 'interactivos',
    price: 300,
    code: '1111',
    stock: 20
});



