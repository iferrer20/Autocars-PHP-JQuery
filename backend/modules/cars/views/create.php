<div class="centered">
    <h1>Create new Car</h1>
    <form method="POST" id="carForm" enctype="multipart/form-data">
        <p lang-key="carname"></p>
        <p class="p-error"><?= $this->car->error_name; ?></p>
        <input name="name" id="carNameInput" value="<?= $this->car->name; ?>"/>
        <p lang-key="cardescr"></p>
        <p class="p-error"><?= $this->car->error_description; ?></p>
        <textarea name="description" id="carDescriptionInput"><?= $this->car->description; ?></textarea>
        <p lang-key="price"></p>
        <p class="p-error"><?= $this->car->error_price; ?></p>
        <input name="price" id="carPriceInput" type="number" value="<?= $this->car->price; ?>"/>
        <p lang-key="img"></p>
        <p class="p-error"><?= $this->car->error_image; ?></p>
        <input type="file" id="carImageInput" name="img">
        <button lang-key="submit" id="carFormButton"></button>
    </form>
    <a href="/"><button>Back</button></a>
</div>