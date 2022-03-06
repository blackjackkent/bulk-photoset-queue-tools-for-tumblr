import BulkPhotosetQueueTools from './BulkPhotosetQueueTools';

window.addEventListener('load', async () => {
	const tools = new BulkPhotosetQueueTools();
	await tools.init();
});
