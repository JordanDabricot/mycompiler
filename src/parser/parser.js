module.exports = tokens => {
	var tokenValues = []
	var AST = { body: [] };
	var last_token = null;
	tokens.forEach(token => {
		if(token.type === "identifier") {
			if(!tokenValues[token.value])
				tokenValues[token.value] = 1
			else
				tokenValues[token.value]++;
		}
	});
	for (var i in tokenValues) {
		if(tokenValues[i] === 1) {
			var expression = {
				type: '',
				value: '',
				warning: "This variable is not used"
			}
		}
	}
	while (tokens.length > 0) {
		var current_token = tokens.shift()
		switch(current_token.type){
			case 'variable-declaraction-var':
			case 'variable-declaraction-let':
				expression.type = 'VariableDeclarationExpression';
				var next = tokens.shift();
				current_token= next;
				if(next.type==="identifier"){
					expression.value = next.value;
				}else{
					throw 'You have to define an identifier for a variable.';
				}
				AST.body.push(expression);
				break;
			case 'equal':
				if(last_token.type=="identifier"){
					var expression = {
						type: 'VariableAssignationExpression'
					}
					var next = tokens.shift();
					current_token= next;
					switch(next.type){
						case 'object-string':
						case 'number':
						case 'number-float':
							expression.value = next;
							break;
						default:
							expression.warning = "You have to assigne a know type to variable " + last_token.value;
							break;
					}
					AST.body.push(expression);
					
				}
				break;
			
			case 'console-object':
				var next = tokens.shift();
				current_token = next;
				if(next.type == "point"){
					var expression = {
						type : 'ConsoleUseMethodeExpression',
						methode: '',
						arguments: []
					}
					next = tokens.shift();
					current_token = next;
					if(next.type === "identifier" || next.type === "method-console-log"){
						expression.methode= next.value;
						next = tokens.shift();
						current_token = next;
						if(next.type === "parenthesis-start"){
							var isEnding= false;
							do{
								next= tokens.shift();
								current_token= next;
								switch(next.type){
									case 'object-string':
									case 'number':
									case 'number-float':
									case 'identifier':
										expression.arguments.push(next);	
										break;
									case 'parenthesis-end':
										isEnding= true;
										break
									case 'virgule':
										break;
									default:
										throw 'Error of using arguments';
								}
							}while(next.type!="parenthesis-end" && tokens.length > 0);
							if(!isEnding){
								throw 'You have to close parenthesis whene you use method.';
							}else{
								AST.body.push(expression);
							}
						}else{
							throw 'You have to use parenthesis to use method.';
						}
						
					}else{
						throw 'You have to define a identifier for a variable.';
					}
				}
				break;
			case 'instruction-end':
			case 'line-break':
				break;
			
		}
		last_token = current_token;
	}
	return AST;
}