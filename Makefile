CONCURRENTLY=../../node_modules/.bin/concurrently
LERNA := ./node_modules/.bin/lerna
JEST := ./node_modules/.bin/jest
YARN := ../../node_modules/.bin/yarn
BABEL := ../../node_modules/.bin/babel

BABEL_ARGS=src --root-mode upward --extensions .js,.jsx -d lib/esm --source-maps

.PHONY: transpile-code
transpile-code:
	$(CONCURRENTLY) "BABEL_ENV=esm ${BABEL} ${BABEL_ARGS}" "BABEL_ENV=cjs ${YARN} babel ${BABEL_ARGS}"

.PHONY: packages
packages:
	$(LERNA) exec --no-private --stream -- $(MAKE) -f ../../Makefile transpile-code