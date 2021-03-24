<h1>Cars</h1>

<a href="/cars/create/"><button class="createcar_btn">Create</button></a>
<div class="carlist">
<?php if (count($this->cars) == 0): ?>
    <h1>No cars avaliable</h1>
<?php endif; ?>
<?php foreach ($this->cars as $car): ?>
    <div class="car">
        <p><?= $car->name; ?></p>
        <img class="image-car" src="/public/img/cars/<?= $car->id; ?>.jpg"/>
        <p><?= $car->description; ?></p>
        <p><?= $car->price; ?>€</p>
        <a href="/cars/read/<?= $car->id; ?>"><button class="read_btn" lang-key="read"></button></a>
        <a href="/cars/delete/<?= $car->id; ?>"><button class="deletecar_btn" lang-key="delete"></button></a>
        <a href="/cars/update/<?= $car->id; ?>"><button class="updatecar_btn" lang-key="update"></button></a>
    </div>
<?php endforeach; ?>
</div>

