$(function(){
	// let arr = [
	// 	{id:1,name:'李四',tell:'15220692020',pinyin:'lisi'},
	// 	{id:2,name:'王五',tell:'13821692425',pinyin:'wangwu'},
	// 	{id:3,name:'马婷',tell:'15234566161',pinyin:'mating'},
	// 	{id:4,name:'丁杰',tell:'13724296070',pinyin:'dingjie'},
	// 	{id:5,name:'付敏',tell:'13824297017',pinyin:'fumin'},
	// 	{id:6,name:'李晓彤',tell:'15834257879',pinyin:'lixiaotong'},
	// 	{id:7,name:'陆晓婷',tell:'13233445672',pinyin:'luxiaoting'},
	// 	{id:8,name:'崔圆',tell:'13422673426',pinyin:'cuiyuan'},
	// 	{id:9,name:'赵林',tell:'15867234456',pinyin:'zhaolin'},
	// 	{id:10,name:'赵夏',tell:'1864772341',pinyin:'zhaoxia'},
	// ]
	// localStorage.setItem('contact',JSON.stringify(arr));
	let data = (JSON.parse(localStorage.getItem('contact')));
	let dl = $('dl')[0];
	let ul = $('ul')[0];	
	let input = $('input')[0];
	// con(data);
	let tip = $('.tip')[0];
	let dts = $('dt');
	let head = $('header')[0];
	let height = head.offsetHeight + tip.offsetHeight;
	let arr1 = [];
	
	tip.innerText =dts[0].innerText;

	Array.prototype.forEach.call(dts,function(ele){
		arr1.push(ele.offsetTop)
	})
	window.addEventListener('scroll',function(){
		let st = document.body.scrollTop || document.documentElement.scrollTop;
		arr1.forEach((ele,index)=>{
			if(st+height >= ele){
				tip.innerText = dts[index].innerText;
			}
		})
	})
	function con(data){
		 let obj = {};
		 //把dl  ul   初始化为空，去除里边的内容
		 dl.innerHTML = '';
		 ul.innerHTML = '';	
		 data.forEach(ele=>{
		 	// firstChar获取首字符       trim()去除字符串左右两端的空格 
		 	// charAt()指定位置的字符    toUpperCase()转换成大写
		 	let firstChar = ele.pinyin.trim().charAt(0).toUpperCase();
		 	if(!obj[firstChar]){
		 		obj[firstChar] = [];
		 	}
		 	obj[firstChar].push(ele); 
		 })
		//Object.keys
		let keys = Object.keys(obj).sort();
		keys.forEach(ele=>{
			dl.innerHTML += `<dt>${ele}</dt>`
			ul.innerHTML +=`<li>${ele}</li>`
		
			obj[ele].forEach(v =>{
				dl.innerHTML += `
					<dd><a href="tel:${v.tell}">${v.name}</a></dd>
				`
			})
		})

		input.addEventListener('input',function(){
		let inp = this.value.trim();
		let obj1 = data.filter(ele =>ele.pinyin.includes(inp) 
			|| ele.name.includes(inp) || ele.tell.includes(inp))
			con(obj1)
		})

	}
})
