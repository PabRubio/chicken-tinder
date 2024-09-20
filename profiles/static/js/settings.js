document.querySelectorAll('input:not([type="file"]):not([type="checkbox"]), select, textarea').forEach(el => {
    el.classList.add('w-full', 'bg-gray-800', 'border', 'border-gray-700', 'rounded-lg', 'px-4', 'py-2', 'text-white', 'shadow-sm', 'hover:shadow-md', 'focus:outline-none', 'focus:border-pink-500', 'focus:ring-1', 'focus:ring-pink-500', 'transition-all', 'peer', 'placeholder-transparent');
});

document.querySelectorAll('select').forEach(el => {
    el.classList.add('appearance-none');
    el.style.backgroundImage = 'none';
});

const bioTextarea = document.getElementById('id_bio');
const bioCharCount = document.getElementById('bio-char-count');
bioTextarea.addEventListener('input', function () {
    const count = this.value.length;
    bioCharCount.textContent = count;
    if (count > 250) {
        this.value = this.value.slice(0, 250);
        bioCharCount.textContent = 250;
    }
});

bioCharCount.textContent = bioTextarea.value.length;

const ageInput = document.getElementById('id_age');
ageInput.addEventListener('input', function () {
    let value = this.value;
    value = value.replace(/[^0-9]/g, '');
    value = Math.max(0, Math.min(23, parseInt(value) || 0));
    this.value = value;
});

const nameInput = document.getElementById('id_name');
if (nameInput) {
    nameInput.addEventListener('input', function () {
        let value = this.value.replace(/[^a-zA-Z]/g, '').slice(0, 10);
        if (value.length > 0) value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        this.value = value;
    });
}

const locationInput = document.getElementById('id_location');
if (locationInput) {
    locationInput.addEventListener('input', function () {
        let value = this.value.replace(/[^a-zA-Z ]/g, '').replace(/\s+/g, ' ').trimStart();
        if (value.endsWith(' ') && value.trim().split(' ').slice(-1)[0].length < 3) value = value.slice(0, -1);
        if (value.length > 15) value = value.substring(0, 15).replace(/\s+$/, '');
        value = value.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase());
        this.value = value;
    });
    locationInput.addEventListener('blur', function () { this.value = this.value.trim(); });
}

const imageContainer = document.getElementById('image-container');
const addImageButton = document.getElementById('add-image');
const fileInput = document.getElementById('file-input');
let imageHashes = new Set();
const MAX_IMAGES = 6;

function updateImageLayout() {
    const allImageWrappers = Array.from(imageContainer.querySelectorAll('.image-wrapper'));
    const visibleImageWrappers = allImageWrappers.filter(wrapper => {
        return wrapper.querySelector('img') && wrapper.style.display !== 'none';
    });
    const imageCount = visibleImageWrappers.length;
    const addImageWrapper = document.getElementById('add-image-wrapper');

    if (imageCount >= MAX_IMAGES) {
        addImageWrapper.style.display = 'none';
    } else {
        addImageWrapper.style.display = 'block';
    }

    const containerWidth = imageContainer.offsetWidth;
    const columnCount = 3;
    const gap = 16;
    const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;

    visibleImageWrappers.forEach(wrapper => {
        wrapper.style.width = `${columnWidth}px`;
        wrapper.style.height = `${columnWidth}px`;
    });

    addImageWrapper.style.width = `${columnWidth}px`;
    addImageWrapper.style.height = `${columnWidth}px`;

    if (addImageWrapper.parentNode) {
        addImageWrapper.parentNode.removeChild(addImageWrapper);
    }

    if (visibleImageWrappers.length > 0) {
        const lastVisibleWrapper = visibleImageWrappers[visibleImageWrappers.length - 1];
        lastVisibleWrapper.after(addImageWrapper);
    } else {
        imageContainer.prepend(addImageWrapper);
    }
}

window.addEventListener('resize', updateImageLayout);

updateImageLayout();

function computeImageHash(imgElement) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgElement, 0, 0, 8, 8);
        const imageData = ctx.getImageData(0, 0, 8, 8).data;
        const hash = CryptoJS.MD5(Array.from(imageData).join(',')).toString();
        resolve(hash);
    });
}

document.querySelectorAll('#image-container img').forEach(async (img) => {
    const hash = await computeImageHash(img);
    imageHashes.add(hash);
});

addImageButton.addEventListener('click', function () {
    const fileInputs = imageContainer.querySelectorAll('input[type="file"]');
    const emptyInput = Array.from(fileInputs).find(input => !input.files[0] && !input.closest('.image-wrapper').querySelector('img'));
    if (emptyInput) {
        emptyInput.click();
    } else {
        console.error('No empty file inputs available');
    }
});

imageContainer.addEventListener('change', async function (e) {
    if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async function (e) {
                const img = new Image();
                img.src = e.target.result;
                img.onload = async function () {
                    const hash = await computeImageHash(img);

                    if (!imageHashes.has(hash)) {
                        imageHashes.add(hash);
                        addImageToContainer(img.src, file);
                        const wrapper = e.target.closest('.image-wrapper');
                        wrapper.innerHTML = `
                            <img src="${img.src}" class="w-full h-full object-cover rounded-lg shadow-lg">
                            <button type="button" class="remove-image absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                            <div class="hidden">
                                ${wrapper.querySelector('input[type="file"]').outerHTML}
                                ${wrapper.querySelector('input[type="hidden"]') ? wrapper.querySelector('input[type="hidden"]').outerHTML : ''}
                                ${wrapper.querySelector('input[type="checkbox"]') ? wrapper.querySelector('input[type="checkbox"]').outerHTML : ''}
                            </div>`;
                        updateImageLayout();
                        lucide.createIcons();
                    } else {
                        alert('This image has already been uploaded.');
                        e.target.value = '';
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    }
});

function addImageToContainer(imgSrc, file) {
    const wrapper = document.createElement('div');
    wrapper.className = 'relative group aspect-square image-wrapper';
    wrapper.innerHTML = `
        <img src="${imgSrc}" class="w-full h-full object-cover rounded-lg shadow-lg">
        <button type="button" class="remove-image absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <i data-lucide="x" class="w-4 h-4"></i>
        </button>
        <div class="hidden">
            <input type="file" name="form-${imageContainer.children.length}-image" accept="image/*">
            <input type="hidden" name="form-${imageContainer.children.length}-id" value="">
            <input type="checkbox" name="form-${imageContainer.children.length}-DELETE" id="form-${imageContainer.children.length}-DELETE">
        </div>`;

    const addImageWrapper = document.getElementById('add-image-wrapper');
    imageContainer.insertBefore(wrapper, addImageWrapper);
    lucide.createIcons();
    updateImageLayout();
}

imageContainer.addEventListener('click', function (e) {
    if (e.target.closest('.remove-image')) {
        const wrapper = e.target.closest('.image-wrapper');
        const deleteCheckbox = wrapper.querySelector('input[type="checkbox"]');
        const fileInput = wrapper.querySelector('input[type="file"]');

        if (deleteCheckbox) {
            deleteCheckbox.checked = true;
        }

        if (fileInput) {
            fileInput.value = '';
        }

        wrapper.style.display = 'none';
        updateImageLayout();
    }
});

document.querySelector('form').addEventListener('submit', function (e) {
    const totalForms = document.querySelector('#id_form-TOTAL_FORMS');
    const visibleImageWrappers = imageContainer.querySelectorAll('.image-wrapper:not([style*="display: none"])');
    totalForms.value = visibleImageWrappers.length;

    visibleImageWrappers.forEach((wrapper, index) => {
        const formPrefix = `form-${index}`;
        wrapper.querySelectorAll('input').forEach(input => {
            input.name = input.name.replace(/form-\d+/, formPrefix);
            input.id = input.id.replace(/form-\d+/, formPrefix);
        });
    });
});