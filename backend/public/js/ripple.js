const arr = document.querySelectorAll('.ripple-effect');
        arr.forEach(ele => {
            ele.addEventListener('click', event => {
                const width = event.srcElement.offsetWidth;
                const height = event.srcElement.offsetHeight;
                const posX = event.offsetX;
                const posY = event.offsetY;
                const out = new dimenstion(height, width, posX, posY)
                // console.log(out)
                const spanele = document.createElement('span');
                spanele.setAttribute('style', 'width:' + out.width + 'px;' + 'height:' + out.height + 'px;' + 'top:' + out.top + 'px;' + 'left:' + out.left + 'px;');
                spanele.classList.add('ripple');
                event.srcElement.append(spanele);
                
            });
            ele.addEventListener('animationend', (event) => {
                event.target.remove();
            })
        });
const array = document.querySelectorAll('.ripple-source');
        array.forEach(ele => {
            ele.addEventListener('click',(event)=>{
                const width = event.srcElement.offsetWidth;
                const height = event.srcElement.offsetHeight;
                const posX = event.offsetX;
                const posY = event.offsetY;
                const out = new dimenstion(height, width, posX, posY)
                // console.log(out)
                const spanele = document.createElement('span');
                spanele.setAttribute('style', 'width:' + out.width + 'px;' + 'height:' + out.height + 'px;' + 'top:' + out.top + 'px;' + 'left:' + out.left + 'px;');
                spanele.classList.add('ripple');
                // console.log(event.srcElement.parentElement)
                event.srcElement.parentElement.append(spanele);
            })
        });
        function dimenstion(height, width, posX, posY) {
            this.width = (width <= height) ? height : width;
            this.height = (width <= height) ? height : width;
            this.top = posY - (this.height * 0.5);
            this.left = posX - (this.width * 0.5);
        }