async function load(url: string, id: string) {
    const res = await fetch(url);
    const content = await res.text();
    const element = document.getElementById(id);
    if (element) element.innerHTML = content;
}

load('../pages/header.html', 'header')
    .then(() => {
        console.log("header done");

        const dropdownItems = document.querySelectorAll('.dropdown li');

        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const category = item.getAttribute('data-cat');
                if (category) {
                    window.location.href = `../pages/category.html?cat=${encodeURIComponent(category)}`;
                }
            });
        });
    });

load('../pages/footer.html', 'footer')
    .then(() => console.log("footer done"));
