import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_51TYspXCCF1YwJaAOyNPVDCcFHu9ebJRVLdwl1jslwICDjM0TIcDcKUpDXy40Os4mP9K2dNhcr4HVstc8SEtbxGtP008t748ron');

export default stripePromise;