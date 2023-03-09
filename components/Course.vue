<template>
    <div class="container bg-light p-2 my-2 sticky-top" id="searchBar">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-10 mb-1"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;台北&quot;,&quot;桃園&quot;,&quot;成功&quot;,&quot;基河&quot;,&quot;金門&quot;]">全部</a></div>
    </div>
    <div class="row justify-content-center mb-2">
        <div class="col-6 col-sm-2 mb-1"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;台北&quot;]">臺北</a></div>
        <div class="col-6 col-sm-2 mb-1"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;桃園&quot;]">桃園</a></div>
        <div class="col-4 col-sm-2"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;成功&quot;]">成功</a></div>
        <div class="col-4 col-sm-2"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;基河&quot;]">基河</a></div>
        <div class="col-4 col-sm-2"><a class="btn d-block btn-outline-secondary" href="?campus=[&quot;金門&quot;]">金門</a></div>
    </div>
    <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6">
        <form action="/courses/async" method="get">
            <div class="input-group">
            <input class="form-control" id="search" type="text" name="search" placeholder="任課教師/科目名稱/課程代碼" />
            <input type="hidden" name="campus" />
            <input class="text-light btn btn-primary" type="submit" value="送出查詢" />
            </div>
        </form>
        </div>
    </div>
    </div>
    <div class="container">
    <div class="row">
        <div id="js-infinite-wrap"></div>
        <div id="js-detective"></div>
    </div>
    </div>
</template>

<script>

export default {
  mounted(){

const url = new URL(location.href);
let params = url.searchParams;
if(!params.has("search")) params.set('search','');
if(!params.has("campus")) params.set('campus','["台北","桃園","成功","基河","金門"]');

const infiniteWrap = document.getElementById('js-infinite-wrap');
let count = 1;

function callback_infinite(entries) {
  Array.prototype.forEach.call(entries, entry => {
    if(entry.isIntersecting) {
      fetch('http://localhost:8080/test/course?' + 'page=' + count + '&search=' + params.get('search') + `&campus=${params.get('campus')}`)
        .then(res => res.json())
        .then(res => {
          // 取消觀察，以免又觸發下一個 request
          observerInfinite.unobserve(infinite);

          if(res.length==0) observerInfinite.disconnect();

          // append html
          let courseType = ["通識", "必修", "選修", "教育"];
          for(let doc of res){
            let teachers = {main:"", sub:""};
            let sessions = "";

            for(let [index, teacher] of Object.entries(doc.teacher_list)){
              if (teacher.type === "main")
                teachers.main += `${teachers.main==="" ? '':'、'}${teacher.name}`;
              else if (teacher.type === "sub")
                teachers.sub += `${teachers.sub==="" ? '':'、'}${teacher.name}`;
            }

          if(teachers.sub!=="") teachers.sub += "<small> 實習</small> ";

            let item = `
            <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
              <div class="card focus h-100">
                <div class="card-body">
                  <a href="/courses/${doc.teacher_list[0].name}/${doc.name}" class="stretched-link"></a>
                  <div class="h5 card-title overflow-auto">
                    ${ doc.name }
                    <div class="float-end">
                      <span class="badge bg-secondary rounded-start">${doc.campus}</span>
                      <span class="badge bg-primary rounded-end">${courseType[doc.type]}</span>
                    </div>
                  </div>
                  <h6 class="card-subtitle mb-2">${teachers.main}</h6>
                  <h6 class="card-subtitle">${teachers.sub}</h6>
                </div>
              </div>
            </div>`;
            infiniteWrap.insertAdjacentHTML('beforebegin', item);

          }

          count++;
          observerInfinite.observe(infinite);

        })
    }
  })
}

  // infinite IO option
  let option_infinite = {
    root: null,
    rootMargin: '0px',
    threshold: [0]
  };

  // infinite create IO
  let observerInfinite = new IntersectionObserver(callback_infinite, option_infinite);

  // animated observe #js-infinite
  const infinite = document.getElementById('js-detective');
  observerInfinite.observe(infinite);
  
  let prevScrollpos = $(window).scrollTop();
  window.onscroll = function() {
  let currentScrollPos = $(window).scrollTop();
  if (prevScrollpos > currentScrollPos) {
    $("#searchBar").css('top',"60px");
  } else {
    $("#searchBar").css('top',"-80px");
  }
  prevScrollpos = currentScrollPos;
  }
  
  if(params.has('campus')) $(`a[href='?campus=${params.get('campus')}']`).addClass('active');
  else $(`a[href='?campus=["台北","桃園","基河","金門"]']`).addClass('active');

  }
}

</script>