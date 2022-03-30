import tools from './BulkPhotosetQueueTools';

window.addEventListener('load', async () => {
	console.log('test');
	await tools.init();
});
