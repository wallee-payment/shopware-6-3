/* global Shopware */

const ApiService = Shopware.Classes.ApiService;

/**
 * @class WalleePayment\Core\Api\Transaction\Controller\TransactionCompletionController
 */
class WalleeTransactionCompletionService extends ApiService {

	/**
	 * WalleeTransactionCompletionService constructor
	 *
	 * @param httpClient
	 * @param loginService
	 * @param apiEndpoint
	 */
	constructor(httpClient, loginService, apiEndpoint = 'wallee') {
		super(httpClient, loginService, apiEndpoint);
	}

	/**
	 * Complete a transaction
	 *
	 * @param {String} salesChannelId
	 * @param {int} transactionId
	 * @return {*}
	 */
	createTransactionCompletion(salesChannelId, transactionId) {

		const headers = this.getBasicHeaders();
		const apiRoute = `_action/${this.getApiBasePath()}/transaction-completion/create-transaction-completion/`;

		return this.httpClient.post(
			apiRoute,
			{
				salesChannelId: salesChannelId,
				transactionId: transactionId
			},
			{
				headers: headers
			}
		).then((response) => {
			return ApiService.handleResponse(response);
		});
	}
}

export default WalleeTransactionCompletionService;