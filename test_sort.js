const obj = {
  vnp_Version: '2.1.0',
  vnp_Command: 'pay',
  vnp_TmnCode: 'A0WP15W9',
  vnp_Locale: 'vn',
  vnp_CurrCode: 'VND',
  vnp_TxnRef: '666fb483db45bc032c8e1e7f-1718610534571',
  vnp_OrderInfo: 'Thanh toan cho ma GD:666fb483db45bc032c8e1e7f-1718610534571',
  vnp_OrderType: 'other',
  vnp_Amount: 150000000,
  vnp_ReturnUrl: 'https://awkward-falcon-segment.ngrok-free.dev/order/payment-vnpay-result',
  vnp_IpAddr: '::1',
  vnp_CreateDate: '20240617144854'
};
const sortObject=(obj)=>{
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
const vnp_Params = sortObject(obj);
const querystring = require('qs');
const signData = querystring.stringify(vnp_Params, { encode: false });
console.log(signData);
