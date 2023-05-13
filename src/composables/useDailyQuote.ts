import { useStorage } from "@vueuse/core";
import axios from "axios";
import moment from "moment";
import { ref } from "vue";
import { useQuery } from "vue-query";

interface Quote {
    timeStamp: Date;
    quote: string;
    author: string;
}

export function useDailyQuote(): Quote {
    window.localStorage.clear();
    if (localStorage.getItem("quoteStore")) {
        const quoteStorage: Quote = JSON.parse(
            localStorage.getItem("quoteStore")!
        );

        const futureStamp = moment(quoteStorage.timeStamp).add(24, "hours");

        if (!moment().isAfter(futureStamp)) return quoteStorage;

        console.log("regenerating quote");
    }

    const quoteStorage = ref<Quote | undefined>();

    const { data: _quote } = useQuery(
        ["quote"],
        () =>
            axios.get("https://api.api-ninjas.com/v1/quotes?category=art", {
                headers: {
                    "X-Api-Key": import.meta.env.VITE_QUOTE_API,
                    "Content-Type": "application/json",
                },
            }),
        {
            onSuccess: (quote) => {
                const storage = useStorage("quoteStore", {
                    quote: {
                        timeStamp: new Date(),
                        quote: quote.data[0].quote,
                        author: quote.data[0],
                    },
                });

                quoteStorage.value = storage.value.quote;
            },

            refetchOnWindowFocus: false,
        }
    );

    console.log(quoteStorage.value);

    return quoteStorage.value!;
}
