$( document ).ready(function() {
	
	var c = document.getElementById("c");
	var ctx = c.getContext("2d");
	var fontSize = 15;

	initCanvas(c);
	var txs = queryTxs();
	initLinks(c, txs, fontSize);

	$(window).resize( respondCanvas );
	    function respondCanvas(){ 
	    	initCanvas(c);
    }

	var txChars = [];
	var columns = c.width/fontSize;
	var rainingTxs = [];

	for(var x = 0; x < columns; x++) {
		rainingTxs[x] = c.height;
		txChars[x] = txs[x % txs.length].split(""); 
	}
		
	function draw()
	{
		ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
		ctx.fillRect(0, 0, c.width, c.height);
		ctx.fillStyle = "#F7931A";
		ctx.font = fontSize + "px courier";
		for(var i = 0; i < rainingTxs.length; i++)
		{
			var character = txChars[i][(rainingTxs[i] -1) % txChars[0].length];
			ctx.fillText(character, i*fontSize, rainingTxs[i]*fontSize);

			if(rainingTxs[i]*fontSize > c.height && Math.random() > 0.993){
				rainingTxs[i] = 0
			}
			rainingTxs[i]++;
		}
	}
	setInterval(draw, 100);

});


function initCanvas(canvas){
	canvas.setAttribute('width', window.innerWidth);
	canvas.setAttribute('height', window.innerHeight-50);
	c.getContext("2d").fillStyle = "rgba(10, 10, 10, 1)";
	c.getContext("2d").fillRect(0, 0, c.width, c.height);
}

function queryTxs() {
	var txs = reserveTxs;
	$.ajax( {
		url  :"https://mainnet.helloblock.io/v1/transactions/latest?limit=40&cors=true",
		async : false,
		success:  function( data ) {
			data.data.transactions.forEach(function(tx){
				txs.unshift(tx.txHash);
			})}
		});
	return txs;
}

function initLinks(canvas, txs, fontSize){
	canvas.onclick = function(e){
		var tx  = txs[Math.floor(e.x / fontSize) % txs.length];
		window.open('http://blockchain.info/tx/' + tx,'_blank');
	};
}

//if the query fails..
var reserveTxs = [
	"945692d1dbd08e17a5021add6d61d10d7a994cc9bb2bb3c69c998fe4c696bd9b",
	"412cda8f922c384c23ddce2e61465f720eea6911276f928fd5a71ce0a4d49fcf",
	"2e54b194a268b716ed8229b91c5065c1265e40771284e106782e80a670f49a7d",
	"32f0f9d1f841ba96603ec73ba0c0f4cd0a55550cf62c2eeb0b03cec7b8c2455b",
	"c340b331ef68270a0052fbe2533a2a71fd827d720bbbf40055a146b522c9f4aa",
	"97c91743d92c996a3f53812b6f532fa66c135d7e9b3f6c0ca76172315f941569",
	"53b7347f11441e205338104d6403c1ae88d3aede45b515830cb7b0a53bb35b9c",
	"6fb62157a8d0317c65b4284c213b053c80aa1aad2ea7eb2960ed60263393e016",
	"12a27398545ab896a4666f043bd898583b6680c9f532f770982c17ded325d93e",
	"dbaabb00b2f3cdcb75ea46e3656a6f09b365dc183285d0b9ead2180ed77a2bf8",
	"5da9092d4e9d3faa79aa1f91551c151b22e86565bcf076d6876e06cdb7f667ad",
	"caced2d30b01dade46339dd919759af01ba3511b5c1328012d5e87a5d2c8c14e",
	"335fb99696af726316afe05e596f5f0fc737f1aac16d0eadbd291eedce1dc5f1",
	"1b0b48db470624ac1f4fe9ef0a4cbb410bca44ef0eb298b6cf78cd47738af4b5",
	"6e07bc9c584d15a28266ff36792b5abb7aebad26d8794ccdc99ecde25c67bd8b",
	"0b263beef47427dc64f30de7cfc1b7e36959311f298575d5f54ec9128fa5718a",
	"74f2ae7b13ded1594c6da408a0fed642e6289621ee13a0d3cf53ea9171e62b8f",
	"752a3de2bfe931b2099a1f434c9a2bdfa97f14baea0f3f7e4cdbaae77b1d33de",
	"55533630251342fae863b4f3738a7b0a69a67b28b678be015c6fb044fd00b4fe",
	"df784995d9cfdc38ca6fee173ae1c03d9dc571cad9b73dc886d9bcca9970cb1a",
	"2530b9a3228235eafe88f47d116e0b6170d519e66f8459a285285bde9c98e90e"
];