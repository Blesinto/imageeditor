const fileInput = document.querySelector(".file_input"),
    filterOption = document.querySelectorAll(".img_filter  button"),
    rotateOption = document.querySelectorAll(".rotate  button"),
    filterName = document.querySelector(".filter_info .name"),
    filterValue = document.querySelector(".filter_info .value"),
    filterSlider = document.querySelector(".slider input"),
    imgpreview = document.querySelector(".preview_img img"),
    resetbtn = document.querySelector(".reset_filter"),
    chooseimage = document.querySelector(".choose_img"),
    saveimage = document.querySelector(".save_img");
;

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilter = () => {

    imgpreview.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    imgpreview.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}
const loadimage = () => {
    let file = fileInput.files[0]; //getting the image
    if (!file) return;
    imgpreview.src = URL.createObjectURL(file); //passing image file
    imgpreview.addEventListener("load", () => {
        resetbtn.click();
        document.querySelector(".img_container").classList.remove("disable")
    });
}

filterOption.forEach(option => {
    option.addEventListener("click", () => { // adding filter button
        document.querySelector(".img_filter .active").classList.remove("active");
        option.classList.add("active")
        filterName.innerText = option.innerText;

        if (option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness
            filterValue.innerText = ` ${brightness}%`;
        } else if (option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = ` ${saturation}%`;

        } else if (option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = ` ${inversion}%`;

        }
        else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = ` ${grayscale}%`;
        }
    });
});

const updatefilter = () => {
    filterValue.innerText = ` ${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".img_filter .active"); //getting selected filter btn
    if (selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    }
    else if (selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    }
    else if (selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    }
    else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}
rotateOption.forEach(option => {
    option.addEventListener("click", () => { //adding click event listener on rotate btn 
        if (option.id === "left") {
            rotate -= 90; //rotate by -90 degree
        }
        else if (option.id === "right") {
            rotate += 90;//rotate by +90 degree
        }
        else if (option.id === "vertical") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }
        else {
            flipVertical = flipVertical === 1 ? -1 : 1
        }
        applyFilter();
    })

})
const resetfilter = () => {
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVertical = 1;
    filterOption[0].click();
    applyFilter();

}
const saveimgbtn = () => {
    const canvans = document.createElement("canvas"); //create a canvans Element
    const ctx = canvans.getContext("2d"); // reture the draw context 
    canvans.width = imgpreview.naturalWidth; // setting width and height of the image
    canvans.height = imgpreview.naturalHeight;
    //applying filter on canvans
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvans.width / 2, canvans.height / 2)// translate canvas from center
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180)
    }
    ctx.scale(flipHorizontal, flipVertical) //applying flip filter on canvans
    ctx.drawImage(imgpreview, -canvans.width / 2, -canvans.height / 2, canvans.width, canvans.height);


    const link = document.createElement("a"); //creating Anchor element
    link.download = "image.jpg";// pqssing <a> tag download value to "image.jpg"
    link.href = canvans.toDataURL();// passing <a> tag href value to canvans data url
    link.click();// click the <a> tage to download
}
fileInput.addEventListener("change", loadimage);
filterSlider.addEventListener("input", updatefilter);
resetbtn.addEventListener("click", resetfilter);
saveimage.addEventListener("click", saveimgbtn);
chooseimage.addEventListener("click", () => fileInput.click());