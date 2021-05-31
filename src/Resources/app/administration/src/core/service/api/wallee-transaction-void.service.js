/* global Shopware */

const ApiService = Shopware.Classes.ApiService;

/**
 * @class WalleePayment\Core\Api\Transaction\Controller\TransactionVoidController
 */
class WalleeTransactionVoidService extends ApiService {

	/**
	 * WalleeTransactionVoidService constructor
	 *
	 * @param httpClient
	 * @param loginService
	 * @param apiEndpoint
	 */
	constructor(httpClient, loginService, apiEndpoint = 'wallee') {
		super(httpClient, loginService, apiEndpoint);
	}

	/**
	 * Void a transaction
	 *
	 * @param {String} salesChannelId
	 * @param {int} transactionId
	 * @return {*}
	 */
	createTransactionVoid(salesChannelId, transactionId) {

		const headers = this.getBasicHeaders();
		const apiRoute = `_action/${this.getApiBasePath()}/transaction-void/create-transaction-void/`;

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

export default WalleeTransactionVoidService;