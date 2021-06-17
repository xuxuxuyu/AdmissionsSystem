//校验学校编码 只能为数字
let validateCode = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('学校编码不能为空'))
	} else {
		const codeReg = /^[0-9]+$/
		const codeMax = /^\d{0,5}$/
		if (codeReg.test(value)) {
			if (codeMax.test(value)) {
				callback()
			} else {
				callback(new Error('学校编码不能大于5位'))
			}

		} else {
			callback(new Error('请输入正确的学校编码，只能是数字'))
		}
	}
}

//校验邮箱
let validateEmail = (rule, value, callback) => {
	if (value) {
		const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
		if (mailReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的邮箱格式'))
		}
	} else {
		callback()
	}
}
//校验英文
let validateEng = (rule, value, callback) => {
	if (value) {
		const mailReg = /^[A-Za-z\-\&\(\)\Ⅰ\Ⅱ\Ⅲ\Ⅳ\Ⅴ\Ⅵ\Ⅶ\Ⅷ\Ⅸ\Ⅹ\s]+$/;
		if (mailReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的英文名字'))
		}
	} else {
		callback()
	}
}
//校验姓名拼音
let validateEngName = (rule, value, callback) => {
	if (value) {
		const EngNameReg = /^[A-Za-z \(\)\s]+$/
		if (EngNameReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的姓名拼音'))
		}
	} else {
		callback()
	}
}

//校验手机号码
let validateHanset = (rule, value, callback) => {
	if (value) {
		// const regs =/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
		const regs = /^1[3|4|5|7|8][0-9]\d{8}$/
		if (regs.test(value)) {
			callback()
		} else {
			return callback(new Error('请输入正确的手机号'))
		}
	} else {
		callback()
	}
}
//校验座机电话
let validatePhone = (rule, value, callback) => {
	if (value) {
		//const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
		// const regs = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		const regs =/^((0\d{2,3}-\d{7,8}))$/;
		// console.log(regss.test(value));
		if (regs.test(value)) {
			callback()
		} else {
			return callback(new Error('请输入正确的座机号'))
		}
	} else {
		callback()
	}
}

//校验家庭电话 手机或者座机
let validateFamilyPhone = (rule, value, callback) => {
	if (value) {
		//const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
		// const regs = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
	//	const regs =/^((0\d{2,3}-\d{7,8}))$/;
		const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		const isMob=/^((\+?86)|(\+86))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|17[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		// console.log(regss.test(value));
		if (isPhone.test(value)||isMob.test(value)) {
			callback()
		} else {
			return callback(new Error('请输入正确的家庭电话'))
		}
	} else {
		callback()
	}
}
// 校验只能为中文
let validateChinese = (rule, value, callback) => {
	if (value) {
		const chineseReg = /^[\u4E00-\u9FA5]+$/
		if (chineseReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入中文'))
		}
	} else {
		callback()
	}
}

//校验学校名称不能为空
let validateXXMC = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('学校名称不能为空'))
	} else {
		const chineseReg = /^[\u4E00-\u9FA5]+$/
		if (chineseReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的学校名字，只能是汉字'))
		}
	}
}


// 校验邮政编码
let validatePostCode = (rule, value, callback) => {
	if (value) {
		const postReg = /^[1-9]\d{5}$/
		if (postReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的邮政编码'))
		}
	} else {
		callback()
	}
}

// 数字
let validateNum = (rule, value, callback) => {
	if (value) {
		const numReg = /^[\d]+$/
		if (numReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入数字'))
		}
	} else {
		callback()
	}
}

// 组织机构代码
let validateOrganization = (rule, value, callback) => {
	if (value) {
		const orgReg = /^[A-Za-z0-9]\w{14}$/g
		if (orgReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入组织机构代码'))
		}
	} else {
		callback()
	}

}

// 传真
let validateFax = (rule, value, callback) => {
	if (value) {
		const faxReg = /^(\d{3,4}-)?\d{7,8}$/
		if (faxReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的传真'))
		}
	} else {
		callback()
	}
}

// 主页地址
let validateHome = (rule, value, callback) => {
	if (value) {
		const homeReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
		if (homeReg.test(value)) {
			callback()
		} else {
			return callback(new Error('请输入正确的主页地址'))
		}
	} else {
		callback()
	}
}

// 学分 小数，且保留最多三位小数
let validateXf = (rule, value, callback) => {
	if (!value) {
		return callback(new Error('学分不能为空'))
	} else {
		const numReg = /^[0-9]+\.[0-9]{0,3}$/
		if (numReg.test(value)) {
				callback()
		} else {
			callback(new Error('请输入小数，且小数点后最多三位'))
		}
	}
}

// 数字格式  小数点后一位
let validateOneNum = (rule, value, callback) => {
	if (value) {
		const numReg = /^\d+(\.\d+)?$/
		const numOneReg = /^\d*\.{0,1}\d{0,1}$/
		if (numReg.test(value)) {
			if (numOneReg.test(value)) {
				callback()
			} else {
				callback(new Error('小数点后最多1位'))
			}
		} else {
			callback(new Error('请输入数字'))
		}
	}
	callback()
}

// 数字格式  小数点后两位
let validateTwoNum = (rule, value, callback) => {
	if (value) {
		const numReg = /^\d+(\.\d+)?$/
		const numTwoReg = /^\d*\.{0,2}\d{0,2}$/
		if (numReg.test(value)) {
			if (numTwoReg.test(value)) {
					callback()
			} else {
				callback(new Error('小数点后最多2位'))
			}
		} else {
			callback(new Error('请输入数字'))
		}
	}
	callback()
}

// 数字格式  小数点后两位  	小数点前保留五位
let validateTwoNumThree = (rule, value, callback) => {
	if (value) {
		if (Number(value) > 10000) {// 校验value值不能大于10000
			callback(new Error('数值过大，请重新输入'))
		} 

		const numReg = /^\d+(\.\d+)?$/
		const numTwoReg = /^\d*\.{0,2}\d{0,2}$/
		if (numReg.test(value)) {
			if (numTwoReg.test(value)) {
				callback()
			} else {
				callback(new Error('小数点后最多2位'))
			}
		} else {
			callback(new Error('请输入数字'))
		}
	}

	callback()
}

// 数字格式  小数点后三位
let validateThreeNum = (rule, value, callback) => {
	if (value) {
		const numReg =/^\d+(\.\d+)?$/
		const numTwoReg = /^\d*\.{0,3}\d{0,3}$/
		if (numReg.test(value)) {
			if (numTwoReg.test(value)) {
				callback()
			} else {
				callback(new Error('小数点后最多3位'))
			}
		} else {
			callback(new Error('请输入数字'))
		}
	}
	callback()
	// if (!value) {
	// 	return callback(new Error('字段不能为空'))
	// } else {
	// 	const numReg = /^\d+(\.\d+)?$/
	// 	const numTwoReg = /^\d*\.{0,3}\d{0,3}$/
	// 	if (numReg.test(value)) {
	// 		if (numTwoReg.test(value)) {
	// 				callback()
	// 		} else {
	// 			callback(new Error('小数点后最多3位'))
	// 		}
	// 	} else {
	// 		callback(new Error('请输入数字'))
	// 	}
	// }
}
//校验年份必须为4位数字
let validateNF = (rule, value, callback) => {
	if (value) {
		const NFReg = /^\d{4}$/
		if (NFReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入4位数字'))
		}
	} else {
		callback()
	}
}
//校验年份必须为4位数字
let validateXQ = (rule, value, callback) => {
	if (value) {
		const NFReg = /^\d{5}$/
		if (NFReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入5位数字'))
		}
	} else {
		callback()
	}
}

//校验分数最大值
let validateMaxNumber = (rule, value, callback) => {
	if (parseInt(value) <= 200) {
		callback()
	} else {
		callback(new Error('分数不能大于200'))
	}

}

//校验正整数
let validateInteger = (rule, value, callback) => {
	if (value) {
		const integerReg = /^[+]{0,1}(\d+)$/
		if (integerReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的整数'))
		}
	} else {
		callback()
	}
}
//校验整数
let validateroundNumber = (rule, value, callback) => {
	if (value) {
		const numReg = /^[1-9]\d*$/
		if (numReg.test(value)) {
			callback()
		} else {
			callback(new Error('请输入正确的整数'))
		}
	} else {
		callback()
	}
}
//校验身份证号
let validateCard = (rule, value, callback) => {
	if (value) {
		let cardBoolean = IdCardValidate(value);
		// const cardReg =/(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		// if (cardReg.test(value)) {
		if (cardBoolean) {
			callback()
		} else {
			callback(new Error('请输入正确的身份证号'))
		}
	} else {
		callback()
	}
}
function IdCardValidate(idCard) {
	idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
	if (idCard.length == 15) {
		return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
	} else if (idCard.length == 18) {
		var a_idCard = idCard.split("");                // 得到身份证数组
		//进行前两位省级编码验证,18位身份证的基本验证和第18位的验证
		if(IdCardValidateAddress(idCard) && isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)){
			return true;
		}else {
			return false;
		}
	} else {
		return false;
	}
}
/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
	let By18Val = a_idCard[17].toLowerCase(); // 获取第十八位值
	const numReg = /^[0-9]\d*$/
	let  numVal = false; // 校验第十八位是否为整数
	if (numReg.test(Number(By18Val))) {
		numVal = true
	}else{
		numVal = false
	}
	if (By18Val == 'x' || By18Val == 'X' || numVal) {
		return true
	}else{
		return false
	}
}
/**
 * 验证身份证号码前两位，省级编码的准确性
 * @param AddressNum
 * @constructor
 */
function IdCardValidateAddress(AddressNum) {
	var city={
		11:"北京",
		12:"天津",
		13:"河北",
		14:"山西",
		15:"内蒙古",
		21:"辽宁",
		22:"吉林",
		23:"黑龙江 ",
		31:"上海",
		32:"江苏",
		33:"浙江",
		34:"安徽",
		35:"福建",
		36:"江西",
		37:"山东",
		41:"河南",
		42:"湖北 ",
		43:"湖南",
		44:"广东",
		45:"广西",
		46:"海南",
		50:"重庆",
		51:"四川",
		52:"贵州",
		53:"云南",
		54:"西藏 ",
		61:"陕西",
		62:"甘肃",
		63:"青海",
		64:"宁夏",
		65:"新疆",
		71:"台湾",
		81:"香港",
		82:"澳门",
		91:"国外 "
	};
	if(city[AddressNum.substr(0,2)]){
		return true
	}else{
		return false
	}
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18){
	var year =  idCard18.substring(6,10);
	var month = idCard18.substring(10,12);
	var day = idCard18.substring(12,14);
	var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
	// 这里用getFullYear()获取年份，避免千年虫问题
	if(temp_date.getFullYear()!=parseFloat(year)
		||temp_date.getMonth()!=parseFloat(month)-1
		||temp_date.getDate()!=parseFloat(day)){
		return false;
	}else{
		return true;
	}
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15){
	var year =  idCard15.substring(6,8);
	var month = idCard15.substring(8,10);
	var day = idCard15.substring(10,12);
	var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
	// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
	if(temp_date.getYear()!=parseFloat(year)
		||temp_date.getMonth()!=parseFloat(month)-1
		||temp_date.getDate()!=parseFloat(day)){
		return false;
	}else{
		return true;
	}
}
/**
 * 去掉字符串头尾空格
 * @param str
 * @returns {*}
 */
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
export default {
	validateCode,
	validateEmail,
	validateEng,
	validatePhone,
	validateChinese,
	validatePostCode,
	validateNum,
	validateOrganization,
	validateFax,
	validateHome,
	validateXXMC,
	validateXf,
	validateOneNum,
	validateMaxNumber,
	validateTwoNum,
	validateTwoNumThree,
	validateThreeNum,
	validateInteger,
	validateNF,
	validateXQ,
	validateroundNumber,
	validateEngName,
	validateCard,
	validateHanset,
	validateFamilyPhone,
	IdCardValidate
}
