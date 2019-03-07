module.exports = ast => {
	var rapport = [] ;
	var note = 10;
	var value = '';
	var expressions = ast.body;
	while (expressions.length > 0) {
		var current_expression = expressions.shift();
		switch(current_expression.type){
			case 'VariableDeclarationExpression':
				if(current_expression.warning) {
					note = note - 1
				}
				break;
			case 'VariableAssignationExpression':
				//check if variable is declared;
				break;
				
			case 'ConsoleUseMethodeExpression':
				//check if methode exist
				//check arguments 
				break;
		}
		rapport.push({ 'type' : current_expression.type,
					   'value' : current_expression.value});
	}
	rapport.push({ 'type' : 'note',
					'note': note})
	return rapport;
}