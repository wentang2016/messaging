var userRouter=require('../routers/userRouter.js');

describe('test main',function(){
	describe('userRouters',function(){
		it('test',function(){
			userRouter.getUsersStatus(['wen1']);
			//expect(userRouter.getUsersStatus(['wen1'])[0]).property('name','wen1');
			//expect(userRouter.getUsersStatus(['wen1'])[0]).property('status',1);
		});
	});
	
});
