import jwt from 'jsonwebtoken';

export const redirecter = (req, res, next) => {
	
    if (req.secure) {
			
        next();
    } else {
		console.log('http Anfrage auf https umgeleitet');
		res.redirect('https://localhost:8443' + req.url);
			
    }
}




export const authChecker = (req, res, next) => {
	
	let tokenVerified = false;
	jwt.verify(req.headers.authorization, 'secret', (err, decoded) => {
		if(decoded) {
			
			tokenVerified = true;
		}       
		
	})
	
	if (req.path ==='/api/auth' || req.path === '/unauthorized') {
		next();
	} 
	else if(tokenVerified){
		next();
	} 
	else {
		 res.redirect('/unauthorized');
		   
	}
}