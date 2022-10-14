function FormCategory(){
    return(
        <div>
            <div>
            <form>
                <label>Nombre de categoria:</label><br/>
                <input type='text' name='categoryNameInput'/>

                <label>Foto de la categoria:</label><br/>
                <input type='text' name='imgCategoryInput'/><br/>
            </form>
        </div>

        </div>
    )
}
export default FormCategory;