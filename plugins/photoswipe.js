import Vue from 'vue';
import PhotoSwipe from 'photoswipe';
import PhotoswipeDefault from 'photoswipe/dist/photoswipe-ui-default.js';


Vue.prototype.onImgBd = function(e) {
    const pswpElement = document.getElementById('onImgBd');
    const w = e.currentTarget.naturalWidth;
    const h = e.currentTarget.naturalHeight;
    const src = e.currentTarget.src;
    const items = [{ src, w, h }];
    const options = { index: 0, closeOnScroll: false, shareEl: false };
    const gallery = new PhotoSwipe(pswpElement, PhotoswipeDefault, items, options);
    gallery.init();
}
export default { PhotoSwipe, PhotoswipeDefault }