import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { NumberOutOfRangeError, InternalServerError } from "@/infra/errors";

// Limite de tempo entre requisições (ms)
const RATE_LIMIT_MS = 5000; // 5 segundos
const clients = new Map(); // chave: IP, valor: timestamp da última requisição
const MAX_COUNT = 100;
const MIN_COUNT = 1;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countParam = searchParams.get("count");
    const count = parseInt(countParam, 10) || 1;

    if (isNaN(count) || count < MIN_COUNT || count > MAX_COUNT) {
      const error = new NumberOutOfRangeError({
        message: `O parâmetro 'count' deve ser um número entre ${MIN_COUNT} e ${MAX_COUNT}.`,
        cause: `Valor recebido: "${countParam}"`,
        action:
          "Envie um valor numérico válido no intervalo permitido e tente novamente.",
        value: countParam,
      });

      return NextResponse.json(error.toJSON(), {
        status: error.statusCode,
      });
    }

    const ip =
      request.headers.get("x-forwarded-for") || request.ip || "unknown";
    const host = request.headers.get("host") || "";

    // Ignora o rate limit se estiver rodando localmente
    const isLocalhost =
      host.includes("localhost") || host.includes("127.0.0.1");

    if (!isLocalhost) {
      const lastRequestTime = clients.get(ip) || 0;
      const now = Date.now();

      if (now - lastRequestTime < RATE_LIMIT_MS) {
        return NextResponse.json(
          {
            error: `Espere ${RATE_LIMIT_MS / 1000} segundos entre requisições.`,
          },
          { status: 429 },
        );
      }

      // Atualiza timestamp da última requisição
      clients.set(ip, now);
    }

    // Geração de dados falsos
    const fakeUsers = Array.from({ length: count }, () => ({
      id: faker.string.uuid(),

      person: {
        name: faker.person.fullName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        middleName: faker.person.middleName(),
        prefix: faker.person.prefix(),
        suffix: faker.person.suffix(),
        gender: faker.person.gender(),
        bio: faker.person.bio(),
        jobTitle: faker.person.jobTitle(),
        jobDescriptor: faker.person.jobDescriptor(),
        jobArea: faker.person.jobArea(),
        jobType: faker.person.jobType(),
      },

      internet: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        displayName: faker.internet.displayName(),
        domainName: faker.internet.domainName(),
        domainSuffix: faker.internet.domainSuffix(),
        domainWord: faker.internet.domainWord(),
        ip: faker.internet.ip(),
        ipv4: faker.internet.ipv4(),
        ipv6: faker.internet.ipv6(),
        httpMethod: faker.internet.httpMethod(),
        httpStatusCode: faker.internet.httpStatusCode(),
        userAgent: faker.internet.userAgent(),
        password: faker.internet.password(),
        emoji: faker.internet.emoji(),
        jwt: faker.internet.jwt(),
        jwtAlgorithm: faker.internet.jwtAlgorithm(),
      },

      location: {
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        countryCode: faker.location.countryCode(),
        zipCode: faker.location.zipCode(),
        street: faker.location.street(),
        streetAddress: faker.location.streetAddress(),
        buildingNumber: faker.location.buildingNumber(),
        secondaryAddress: faker.location.secondaryAddress(),
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
        nearbyGPSCoordinate: faker.location.nearbyGPSCoordinate(),
        timeZone: faker.location.timeZone(),
        direction: faker.location.direction(),
        cardinalDirection: faker.location.cardinalDirection(),
        ordinalDirection: faker.location.ordinalDirection(),
        county: faker.location.county(),
        continent: faker.location.continent(),
      },

      company: {
        name: faker.company.name(),
        catchPhrase: faker.company.catchPhrase(),
        catchPhraseDescriptor: faker.company.catchPhraseDescriptor(),
        catchPhraseAdjective: faker.company.catchPhraseAdjective(),
        catchPhraseNoun: faker.company.catchPhraseNoun(),
        buzzAdjective: faker.company.buzzAdjective(),
        buzzNoun: faker.company.buzzNoun(),
        buzzPhrase: faker.company.buzzPhrase(),
        buzzVerb: faker.company.buzzVerb(),
      },

      finance: {
        accountName: faker.finance.accountName(),
        accountNumber: faker.finance.accountNumber(),
        amount: faker.finance.amount(),
        bic: faker.finance.bic(),
        bitcoinAddress: faker.finance.bitcoinAddress(),
        creditCardCVV: faker.finance.creditCardCVV(),
        creditCardIssuer: faker.finance.creditCardIssuer(),
        creditCardNumber: faker.finance.creditCardNumber(),
        currency: faker.finance.currency(),
        currencyCode: faker.finance.currencyCode(),
        currencyName: faker.finance.currencyName(),
        currencySymbol: faker.finance.currencySymbol(),
        ethereumAddress: faker.finance.ethereumAddress(),
        iban: faker.finance.iban(),
        litecoinAddress: faker.finance.litecoinAddress(),
        pin: faker.finance.pin(),
        routingNumber: faker.finance.routingNumber(),
        transactionDescription: faker.finance.transactionDescription(),
        transactionType: faker.finance.transactionType(),
      },

      phone: {
        number: faker.phone.number(),
        imei: faker.phone.imei(),
      },

      image: {
        avatar: faker.image.avatar(),
        avatarGitHub: faker.image.avatarGitHub(),
        dataUri: faker.image.dataUri(),
        url: faker.image.url(),
      },

      lorem: {
        word: faker.lorem.word(),
        words: faker.lorem.words(),
        sentence: faker.lorem.sentence(),
        sentences: faker.lorem.sentences(),
        paragraph: faker.lorem.paragraph(),
        paragraphs: faker.lorem.paragraphs(),
        lines: faker.lorem.lines(),
        slug: faker.lorem.slug(),
        text: faker.lorem.text(),
      },

      date: {
        past: faker.date.past().toISOString(),
        future: faker.date.future().toISOString(),
        recent: faker.date.recent().toISOString(),
        birthdate: faker.date.birthdate(),
        anytime: faker.date.anytime(),
      },

      vehicle: {
        vehicle: faker.vehicle.vehicle(),
        vin: faker.vehicle.vin(),
        bicycle: faker.vehicle.bicycle(),
        fuel: faker.vehicle.fuel(),
        manufacturer: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        color: faker.vehicle.color(),
      },

      book: {
        title: faker.book.title(),
        author: faker.book.author(),
        genre: faker.book.genre(),
        publisher: faker.book.publisher(),
        series: faker.book.series(),
        format: faker.book.format(),
      },

      createdAt: faker.date.past().toISOString(),
      uuid: faker.string.uuid(),
      randomNumber: faker.number.int({ min: 1, max: 1000 }),
    }));

    return NextResponse.json(fakeUsers, { status: 200 });
  } catch (cause) {
    const error = new InternalServerError({ cause });
    console.error(error);
    return NextResponse.json(error.toJSON(), { status: error.statusCode });
  }
}
