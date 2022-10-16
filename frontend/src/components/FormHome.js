function FormHome(){

    //home/savehome
    //home/savecategory
    //home/saveservice
    return(
        <div>
            <form>
                <label>Nombre empresa:</label><br/>
                <input type='text' name='brandNameInput'/>

                <label>Direción:</label><br/>
                <input type='text' name='adressInput'/><br/>

                <label>Número de contacto:</label><br/>
                <input type='tel' name='telephoneInput'/><br/>
                
                <label>Descripción de la empresa:</label><br/>
                <input type='text' name='descriptionInput'/><br/>

            </form>

        </div>
    )
}
export default FormHome;