const crypto = require("crypto");
const secretKey = "XNBCJFAKAZQSGTARRLGCHVZWCIOIGSHN";

const params = {
    vnp_Amount: '1000000',
    vnp_Command: 'pay',
    vnp_CreateDate: '20260617101328',
    vnp_CurrCode: 'VND',
    vnp_IpAddr: '127.0.0.1',
    vnp_Locale: 'vn',
    vnp_OrderInfo: 'Thanh toan cho ma don hang 6a3210d8557063e52e26cbd1',
    vnp_OrderType: 'other',
    vnp_ReturnUrl: 'https://awkward-falcon-segment.ngrok-free.dev/order/payment-vnpay-result',
    vnp_TmnCode: 'CGXZLS0Z',
    vnp_TxnRef: '6a3210d8557063e52e26cbd1-1781666008480',
    vnp_Version: '2.1.0'
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

const vnp_Params = sortObject(params);
const querystring = require('qs');
const signData = querystring.stringify(vnp_Params, { encode: false });
const url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?" + querystring.stringify(vnp_Params, { encode: false }) + "&vnp_SecureHash=" + crypto.createHmac("sha512", secretKey).update(Buffer.from(signData, 'utf-8')).digest("hex");
console.log(url);
