function generate(name, username, secret) {
	if(name.length < 1 || username.length < 1 || secret.length < 1){
		return ""
	}

	const left = []
	for(let i = 0; i < name.length; i++){
		const cval = name.charCodeAt(i)
		const uval = safeGet(username, i)
		left.push(cval * uval);
	}

	const right = []
	for (let i = 0; i < username.length; i++) {
		const cval = username.charCodeAt(i)
		const nval = safeGet(name, i)
		right.push(nval * cval)
	}

	const res = []
	let i = 0
	for (const n of [...left, ...right]) {
		const sval = safeGet(secret, i)
		const rval = parseInt(n / sval) % 93 + 33
		res.push(String.fromCharCode(rval))
		i++
	}
	
	return res.join("")
}

function safeGet(array, index){
	if(array.length < 2) return array.charCodeAt(0)
	if(index > array.length - 1){
		index = index % (array.length - 1)
	}
	return array.charCodeAt(index)
}

window.onload = () => {
	const name = document.getElementById("name")
	const username = document.getElementById("username")
	const secret = document.getElementById("secret")
	const generateButton = document.getElementById("generate")
	
	generateButton.addEventListener("click", ()=>{
		const generatedPassword = generate(name.value || "", username.value || "", secret.value || "")
		alert(generatedPassword)
	})
}
