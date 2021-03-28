class tabs extends EventTarget{
    constructor( _tabs ){
        super();
        let self = this;
        this.tabs = document.getElementById(_tabs);

        this.contentList = this.tabs.querySelectorAll('.content');
       
        this.contentContainer = document.createElement('div');
        this.contentContainer.classList.add('content-container');
        
        this.labelList = document.createElement('ul');
        this.labelList.classList.add('label-list');

        this.contentList.forEach( ( content, index ) => {


            let labelItem = document.createElement('li');
            labelItem.classList.add('label-list__item');

            if ( content.hasAttribute('data-label') ) {
                labelItem.innerHTML = content.getAttribute('data-label');
                content.removeAttribute('data-label');
            } else{
                labelItemWrap.innerHTML = "";
            }

            content.setAttribute('data-index', index);
            labelItem.setAttribute('data-index', index);
            
            this.labelList.append(labelItem);
            this.contentContainer.append(content);
        })
        
        this.tabs.append(this.labelList);
        
        this.tabs.append(this.contentContainer);

        this.tabs.querySelectorAll('.label-list__item')[0].classList.add('label-list__item_active');
        this.tabs.querySelectorAll('.content')[0].classList.add('content_active');

        
        this.labelItemsList = this.tabs.querySelectorAll('.label-list__item');
        this.labelItemsList.forEach( (item, index) => {
            item.onclick = function(){
                let activeContent = self.tabs.querySelector('.content_active');
                let activeLabel = self.tabs.querySelector('.label-list__item_active');
                
                activeContent.classList.remove('content_active');
                activeLabel.classList.remove('label-list__item_active');

                this.classList.add('label-list__item_active');
                self.tabs.querySelector('.content[data-index="'+this.getAttribute('data-index')+'"]').classList.add('content_active');
            }
        });
        
        this.contentList = this.tabs.querySelectorAll('.content');
        this.containerHeight = 0;
        let paddingTB =   parseInt( getComputedStyle( this.contentList[0] ).paddingTop ) + parseInt( getComputedStyle( this.contentList[0] ).paddingBottom );
        
        this.contentList.forEach( (content) => {
            if ( content.clientHeight > this.containerHeight ) this.containerHeight = content.clientHeight;
        } )
        this.contentContainer.style.height = this.containerHeight + 'px';

        
        window.onresize = function(){
            self.contentList = self.tabs.querySelectorAll('.content');
        
            self.containerHeight = 0;
            let paddingTB =   parseInt( getComputedStyle( self.contentList[0] ).paddingTop ) + parseInt( getComputedStyle( self.contentList[0] ).paddingBottom );
            
            self.contentList.forEach( (content) => {
                content.style.minHeight = 'max-content';
                if ( content.clientHeight > self.containerHeight ) {
                    self.containerHeight = content.clientHeight;
                }

                content.style.minHeight = '100%';
            } )
            self.contentContainer.style.height = self.containerHeight + 'px';

        }
    }
}

let t = new tabs( 'tabs' );

    