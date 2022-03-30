import tools from './BulkPhotosetQueueTools';

window.addEventListener('load', async () => {
	console.log('testing');
	await tools.init();
});
