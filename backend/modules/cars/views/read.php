<div class="centered">
    <h1><?= $this->car->name; ?></h1>
    <h2>Image</h2>
    <img id="read-img" src="/public/img/cars/<?= $this->car->id; ?>.jpg">
    <h2>Description: <?= $this->car->description; ?></h2>
    <h2>Price: <?= $this->car->price; ?></h2>
    <a href="/"><button>Back</button></a>
</div>